import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toDateInputValue } from '../utils/prediction';

const STORAGE_KEY = 'fittrack-premium-v1';

const INITIAL_STATE = {
  profile: {
    name: 'Athlete',
    age: 28,
    heightCm: 172,
    currentWeight: 78,
    gender: 'male'
  },
  goals: {
    goalWeight: 70,
    weeklyWorkoutTarget: 5
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
  workouts: [
    { id: 'w1', date: toDateInputValue(new Date()), type: 'Running', durationMin: 40, caloriesBurned: 420 },
    { id: 'w2', date: toDateInputValue(new Date(Date.now() - 86400000)), type: 'Strength', durationMin: 50, caloriesBurned: 360 }
  ],
  foodLogs: [
    { id: 'f1', date: toDateInputValue(new Date()), meal: 'Lunch Bowl', caloriesConsumed: 640 },
    { id: 'f2', date: toDateInputValue(new Date(Date.now() - 86400000)), meal: 'Dinner', caloriesConsumed: 820 }
  ],
  weightHistory: [
    { id: 'wh1', date: toDateInputValue(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)), weight: 79.2 },
    { id: 'wh2', date: toDateInputValue(new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)), weight: 78.8 },
    { id: 'wh3', date: toDateInputValue(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)), weight: 78.4 },
    { id: 'wh4', date: toDateInputValue(new Date()), weight: 78 }
  ]
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

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);

    return {
      ...INITIAL_STATE,
      ...parsed,
      profile: { ...INITIAL_STATE.profile, ...(parsed.profile || {}) },
      goals: { ...INITIAL_STATE.goals, ...(parsed.goals || {}) },
      settings: { ...INITIAL_STATE.settings, ...(parsed.settings || {}) },
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : INITIAL_STATE.workouts,
      foodLogs: Array.isArray(parsed.foodLogs) ? parsed.foodLogs : INITIAL_STATE.foodLogs,
      weightHistory: Array.isArray(parsed.weightHistory) ? parsed.weightHistory : INITIAL_STATE.weightHistory
    };
  } catch {
    return INITIAL_STATE;
  }
}

function sanitizeImportedState(raw) {
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

export function AppStateProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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

  const value = useMemo(
    () => ({
      state,
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
      importAllData
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
