import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const STORAGE_KEY = 'fittrack-premium-v1';
const CLOUD_TABLE = 'fittrack_user_data';
const PROFILE_TABLE = 'fittrack_profiles';
const WORKOUTS_TABLE = 'fittrack_workouts';
const FOOD_TABLE = 'fittrack_food_logs';
const WEIGHT_TABLE = 'fittrack_weight_history';

const INITIAL_STATE = {
  profile: {
    name: '',
    age: '',
    heightCm: '',
    currentWeight: '',
    gender: 'male'
  },
  goals: {
    goalWeight: '',
    weeklyWorkoutTarget: ''
  },
  settings: {
    remind: true,
    achieve: true,
    imperial: false,
    bmr: true,
    useNormalizedCalories: true,
    avgWindowDays: 7,
    projectionDays: 30
  },
  workouts: [],
  foodLogs: [],
  weightHistory: []
};

function buildEmptyState() {
  return {
    profile: { ...INITIAL_STATE.profile },
    goals: { ...INITIAL_STATE.goals },
    settings: { ...INITIAL_STATE.settings },
    workouts: [],
    foodLogs: [],
    weightHistory: []
  };
}

const AppStateContext = createContext(null);

function sanitizeState(raw) {
  if (!raw || typeof raw !== 'object') return INITIAL_STATE;

  return {
    ...INITIAL_STATE,
    ...raw,
    profile: { ...INITIAL_STATE.profile, ...(raw.profile || {}) },
    goals: { ...INITIAL_STATE.goals, ...(raw.goals || {}) },
    settings: { ...INITIAL_STATE.settings, ...(raw.settings || {}) },
    workouts: Array.isArray(raw.workouts) ? raw.workouts : INITIAL_STATE.workouts,
    foodLogs: Array.isArray(raw.foodLogs) ? raw.foodLogs : INITIAL_STATE.foodLogs,
    weightHistory: Array.isArray(raw.weightHistory) ? raw.weightHistory : INITIAL_STATE.weightHistory
  };
}

function makeSafeId(prefix, idx) {
  const hasCrypto = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function';
  if (hasCrypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeImportedWorkouts(list) {
  const seen = new Set();
  return (Array.isArray(list) ? list : []).map((item, idx) => {
    const base = item && typeof item === 'object' ? item : {};
    let id = String(base.id || '').trim();
    if (!id || seen.has(id)) id = makeSafeId('workout', idx);
    seen.add(id);

    return {
      ...base,
      id,
      type: base.type || 'Running',
      date: base.date || new Date().toISOString().slice(0, 10),
      amount: Number(base.amount) || 0,
      sets: Math.max(1, Number(base.sets) || 1),
      durationMin: Number(base.durationMin) || 0,
      caloriesBurned: Number(base.caloriesBurned) || 0,
      unit: base.unit || 'min'
    };
  });
}

function normalizeImportedFoods(list) {
  const seen = new Set();
  return (Array.isArray(list) ? list : []).map((item, idx) => {
    const base = item && typeof item === 'object' ? item : {};
    let id = String(base.id || '').trim();
    if (!id || seen.has(id)) id = makeSafeId('food', idx);
    seen.add(id);

    return {
      ...base,
      id,
      meal: base.meal || 'Meal',
      date: base.date || new Date().toISOString().slice(0, 10),
      caloriesConsumed: Number(base.caloriesConsumed) || 0
    };
  });
}

function normalizeImportedWeights(list) {
  const seen = new Set();
  return (Array.isArray(list) ? list : []).map((item, idx) => {
    const base = item && typeof item === 'object' ? item : {};
    let id = String(base.id || '').trim();
    if (!id || seen.has(id)) id = makeSafeId('weight', idx);
    seen.add(id);

    return {
      ...base,
      id,
      date: base.date || new Date().toISOString().slice(0, 10),
      weight: Number(base.weight) || 0
    };
  });
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    return sanitizeState(JSON.parse(raw));
  } catch {
    return INITIAL_STATE;
  }
}

function sanitizeImportedState(raw) {
  const next = sanitizeState(raw);
  return {
    ...next,
    workouts: normalizeImportedWorkouts(next.workouts),
    foodLogs: normalizeImportedFoods(next.foodLogs),
    weightHistory: normalizeImportedWeights(next.weightHistory)
  };
}

export function AppStateProvider({ children }) {
  const [state, setState] = useState(loadInitialState);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [cloudSyncStatus, setCloudSyncStatus] = useState(isSupabaseConfigured ? 'idle' : 'disabled');
  const [authError, setAuthError] = useState('');
  const isHydratingCloudRef = useRef(false);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const persistMirrorState = useCallback(async (userId, payload) => {
    const profileRow = {
      user_id: userId,
      name: payload?.profile?.name || '',
      age: Number(payload?.profile?.age) || 0,
      height_cm: Number(payload?.profile?.heightCm) || 0,
      current_weight: Number(payload?.profile?.currentWeight) || 0,
      gender: payload?.profile?.gender || 'male',
      goal_weight: Number(payload?.goals?.goalWeight) || 0,
      weekly_workout_target: Number(payload?.goals?.weeklyWorkoutTarget) || 0,
      settings: payload?.settings || {},
      updated_at: new Date().toISOString()
    };

    const workouts = Array.isArray(payload?.workouts)
      ? payload.workouts.map((w) => ({
          id: String(w.id),
          user_id: userId,
          date: w.date,
          type: w.type,
          amount: Number(w.amount) || 0,
          sets: Number(w.sets) || 1,
          unit: w.unit || 'min',
          duration_min: Number(w.durationMin) || 0,
          calories_burned: Number(w.caloriesBurned) || 0,
          updated_at: new Date().toISOString()
        }))
      : [];

    const foodLogs = Array.isArray(payload?.foodLogs)
      ? payload.foodLogs.map((f) => ({
          id: String(f.id),
          user_id: userId,
          date: f.date,
          meal: f.meal,
          calories_consumed: Number(f.caloriesConsumed) || 0,
          updated_at: new Date().toISOString()
        }))
      : [];

    const weightHistory = Array.isArray(payload?.weightHistory)
      ? payload.weightHistory.map((w) => ({
          id: String(w.id),
          user_id: userId,
          date: w.date,
          weight: Number(w.weight) || 0,
          updated_at: new Date().toISOString()
        }))
      : [];

    const { error: profileError } = await supabase
      .from(PROFILE_TABLE)
      .upsert(profileRow);
    if (profileError) throw profileError;

    const { error: wipeWorkoutsError } = await supabase
      .from(WORKOUTS_TABLE)
      .delete()
      .eq('user_id', userId);
    if (wipeWorkoutsError) throw wipeWorkoutsError;

    if (workouts.length) {
      const { error: workoutsError } = await supabase
        .from(WORKOUTS_TABLE)
        .insert(workouts);
      if (workoutsError) throw workoutsError;
    }

    const { error: wipeFoodError } = await supabase
      .from(FOOD_TABLE)
      .delete()
      .eq('user_id', userId);
    if (wipeFoodError) throw wipeFoodError;

    if (foodLogs.length) {
      const { error: foodError } = await supabase
        .from(FOOD_TABLE)
        .insert(foodLogs);
      if (foodError) throw foodError;
    }

    const { error: wipeWeightError } = await supabase
      .from(WEIGHT_TABLE)
      .delete()
      .eq('user_id', userId);
    if (wipeWeightError) throw wipeWeightError;

    if (weightHistory.length) {
      const { error: weightError } = await supabase
        .from(WEIGHT_TABLE)
        .insert(weightHistory);
      if (weightError) throw weightError;
    }
  }, []);

  const persistCloudState = useCallback(async (userId, payload) => {
    const { error } = await supabase
      .from(CLOUD_TABLE)
      .upsert({ user_id: userId, payload, updated_at: new Date().toISOString() });

    if (error) throw error;

    await persistMirrorState(userId, payload);
  }, [persistMirrorState]);

  const loadCloudState = useCallback(async (userId) => {
    if (!isSupabaseConfigured) return;

    isHydratingCloudRef.current = true;
    setCloudSyncStatus('syncing');

    try {
      const { data, error } = await supabase
        .from(CLOUD_TABLE)
        .select('payload')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data?.payload) {
        setState(sanitizeState(data.payload));
      } else {
        await persistCloudState(userId, stateRef.current);
      }

      setCloudSyncStatus('ready');
      setAuthError('');
    } catch (err) {
      setCloudSyncStatus('error');
      setAuthError(err?.message || 'Cloud sync failed.');
    } finally {
      isHydratingCloudRef.current = false;
    }
  }, [persistCloudState]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;

    async function initAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;

      if (error) {
        setAuthError(error.message || 'Unable to initialize auth.');
      }

      setSession(data?.session || null);
      setUser(data?.session?.user || null);

      if (data?.session?.user) {
        await loadCloudState(data.session.user.id);
      }

      if (active) setAuthLoading(false);
    }

    initAuth();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
      setUser(nextSession?.user || null);

      if (nextSession?.user) {
        loadCloudState(nextSession.user.id);
      } else {
        setCloudSyncStatus('idle');
        setState(buildEmptyState());
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadCloudState]);

  useEffect(() => {
    if (!isSupabaseConfigured || !user || authLoading || isHydratingCloudRef.current) return;

    let active = true;

    async function syncState() {
      setCloudSyncStatus('syncing');
      try {
        await persistCloudState(user.id, state);
        if (active) {
          setCloudSyncStatus('ready');
          setAuthError('');
        }
      } catch (err) {
        if (active) {
          setCloudSyncStatus('error');
          setAuthError(err?.message || 'Cloud sync failed.');
        }
      }
    }

    syncState();

    return () => {
      active = false;
    };
  }, [state, user, authLoading, persistCloudState]);

  const updateProfile = useCallback((updates) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  }, []);

  const updateGoals = useCallback((updates) => {
    setState((prev) => ({ ...prev, goals: { ...prev.goals, ...updates } }));
  }, []);

  const updateSettings = useCallback((updates) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...updates } }));
  }, []);

  const addWorkout = useCallback((workout) => {
    setState((prev) => ({
      ...prev,
      workouts: [{ id: crypto.randomUUID(), ...workout }, ...prev.workouts]
    }));
  }, []);

  const updateWorkout = useCallback((id, updates) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((w) => (w.id === id ? { ...w, ...updates } : w))
    }));
  }, []);

  const deleteWorkout = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((w) => w.id !== id)
    }));
  }, []);

  const addFoodLog = useCallback((food) => {
    setState((prev) => ({
      ...prev,
      foodLogs: [{ id: crypto.randomUUID(), ...food }, ...prev.foodLogs]
    }));
  }, []);

  const updateFoodLog = useCallback((id, updates) => {
    setState((prev) => ({
      ...prev,
      foodLogs: prev.foodLogs.map((f) => (f.id === id ? { ...f, ...updates } : f))
    }));
  }, []);

  const deleteFoodLog = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      foodLogs: prev.foodLogs.filter((f) => f.id !== id)
    }));
  }, []);

  const addWeightLog = useCallback((entry) => {
    setState((prev) => ({
      ...prev,
      weightHistory: [{ id: crypto.randomUUID(), ...entry }, ...prev.weightHistory]
    }));
  }, []);

  const updateWeightLog = useCallback((id, updates) => {
    setState((prev) => ({
      ...prev,
      weightHistory: prev.weightHistory.map((w) => (w.id === id ? { ...w, ...updates } : w))
    }));
  }, []);

  const deleteWeightLog = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      weightHistory: prev.weightHistory.filter((w) => w.id !== id)
    }));
  }, []);

  const clearAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(buildEmptyState());
  }, []);

  const importAllData = useCallback((nextState) => {
    setState(sanitizeImportedState(nextState));
  }, []);

  const signUp = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const emailRedirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : undefined;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo
      }
    });
    if (error) throw error;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem(STORAGE_KEY);
    setState(buildEmptyState());
  }, []);

  const value = useMemo(
    () => ({
      state,
      auth: {
        isConfigured: isSupabaseConfigured,
        session,
        user,
        authLoading,
        cloudSyncStatus,
        authError,
        signUp,
        signIn,
        signOut
      },
      actions: {
        updateProfile,
        updateGoals,
        updateSettings,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        addFoodLog,
        updateFoodLog,
        deleteFoodLog,
        addWeightLog,
        updateWeightLog,
        deleteWeightLog,
        clearAllData,
        importAllData
      }
    }),
    [
      state,
      updateProfile,
      updateGoals,
      updateSettings,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      addFoodLog,
      updateFoodLog,
      deleteFoodLog,
      addWeightLog,
      updateWeightLog,
      deleteWeightLog,
      clearAllData,
      importAllData,
      session,
      user,
      authLoading,
      cloudSyncStatus,
      authError,
      signUp,
      signIn,
      signOut
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
