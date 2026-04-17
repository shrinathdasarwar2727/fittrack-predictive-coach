import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DashboardLayout,
  GlassCard,
  InsightCard,
  Navbar,
  NowTrackingBar,
  ProgressRing,
  QuickLogForm,
  StatCard,
  WorkoutList
} from './components/dashboard';
import { useAppState } from './context/AppStateContext';
import {
  buildPredictedSeries,
  calculateBMR,
  calculateWorkoutCaloriesMET,
  calculateDaysForExtraBurn,
  calculatePrediction,
  getRecentDailyTotals,
  toDateInputValue
} from './utils/prediction';

const PAGES = ['dashboard', 'log', 'workouts', 'nutrition', 'progress', 'calendar', 'timer', 'search', 'notifications', 'settings'];
const SmoothChartLazy = lazy(() => import('./components/dashboard/SmoothChart'));

const WORKOUT_LIBRARY = [
  { name: 'Running', icon: '🏃', unit: 'min', mode: 'time', met: 9.8, color: 'violet' },
  { name: 'Walking', icon: '🚶', unit: 'steps', mode: 'count', met: 3.5, secPerRep: 0.5, color: 'cyan' },
  { name: 'Cycling', icon: '🚴', unit: 'min', mode: 'time', met: 7.5, color: 'teal' },
  { name: 'Swimming', icon: '🏊', unit: 'min', mode: 'time', met: 7.0, color: 'blue' },
  { name: 'HIIT', icon: '⚡', unit: 'min', mode: 'time', met: 10.0, color: 'orange' },
  { name: 'Strength', icon: '🏋️', unit: 'min', mode: 'time', met: 5.0, color: 'amber' },
  { name: 'Yoga', icon: '🧘', unit: 'min', mode: 'time', met: 2.5, color: 'green' },
  { name: 'Pilates', icon: '🤸', unit: 'min', mode: 'time', met: 3.0, color: 'green' },
  { name: 'Stretching', icon: '🤲', unit: 'min', mode: 'time', met: 2.3, color: 'teal' },
  { name: 'Mobility', icon: '🦾', unit: 'min', mode: 'time', met: 2.8, color: 'cyan' },
  { name: 'Jump Rope', icon: '🪢', unit: 'jumps', mode: 'count', met: 12.3, secPerRep: 0.5, color: 'pink' },
  { name: 'Jumping Jacks', icon: '🕺', unit: 'reps', mode: 'count', met: 8.0, secPerRep: 1.2, color: 'pink' },
  { name: 'Push-ups', icon: '💪', unit: 'reps', mode: 'count', met: 3.8, secPerRep: 2.0, color: 'red' },
  { name: 'Sit-ups', icon: '🧍', unit: 'reps', mode: 'count', met: 3.8, secPerRep: 2.0, color: 'red' },
  { name: 'Crunches', icon: '🟠', unit: 'reps', mode: 'count', met: 3.8, secPerRep: 1.8, color: 'red' },
  { name: 'Pull-ups', icon: '🧲', unit: 'reps', mode: 'count', met: 8.0, secPerRep: 3.0, color: 'amber' },
  { name: 'Chin-ups', icon: '🧲', unit: 'reps', mode: 'count', met: 8.0, secPerRep: 3.0, color: 'amber' },
  { name: 'Tricep Dips', icon: '🪑', unit: 'reps', mode: 'count', met: 5.0, secPerRep: 2.5, color: 'amber' },
  { name: 'Plank', icon: '🧱', unit: 'sec', mode: 'time-sec', met: 4.0, color: 'indigo' },
  { name: 'Wall Sit', icon: '🧱', unit: 'sec', mode: 'time-sec', met: 4.2, color: 'indigo' },
  { name: 'Squats', icon: '🦵', unit: 'reps', mode: 'count', met: 5.0, secPerRep: 3.0, color: 'emerald' },
  { name: 'Lunges', icon: '🦵', unit: 'reps', mode: 'count', met: 4.5, secPerRep: 3.0, color: 'emerald' },
  { name: 'Burpees', icon: '🔥', unit: 'reps', mode: 'count', met: 8.0, secPerRep: 3.5, color: 'orange' },
  { name: 'Mountain Climbers', icon: '⛰️', unit: 'reps', mode: 'count', met: 8.0, secPerRep: 1.6, color: 'orange' },
  { name: 'Deadlift', icon: '🏋️', unit: 'reps', mode: 'count', met: 6.0, secPerRep: 4.0, color: 'violet' },
  { name: 'Bench Press', icon: '🏋️', unit: 'reps', mode: 'count', met: 5.0, secPerRep: 4.0, color: 'violet' },
  { name: 'Shoulder Press', icon: '🏋️', unit: 'reps', mode: 'count', met: 4.8, secPerRep: 3.5, color: 'violet' },
  { name: 'Bicep Curls', icon: '💪', unit: 'reps', mode: 'count', met: 3.5, secPerRep: 2.5, color: 'violet' },
  { name: 'Leg Press', icon: '🦿', unit: 'reps', mode: 'count', met: 5.0, secPerRep: 3.5, color: 'emerald' },
  { name: 'Rowing Machine', icon: '🚣', unit: 'min', mode: 'time', met: 7.0, color: 'cyan' },
  { name: 'Elliptical', icon: '🛞', unit: 'min', mode: 'time', met: 5.0, color: 'teal' },
  { name: 'Stair Climber', icon: '🪜', unit: 'min', mode: 'time', met: 8.8, color: 'orange' },
  { name: 'Hiking', icon: '🥾', unit: 'min', mode: 'time', met: 6.0, color: 'green' },
  { name: 'Dance', icon: '💃', unit: 'min', mode: 'time', met: 5.0, color: 'pink' },
  { name: 'Zumba', icon: '🎶', unit: 'min', mode: 'time', met: 6.5, color: 'pink' },
  { name: 'Boxing', icon: '🥊', unit: 'min', mode: 'time', met: 9.0, color: 'red' },
  { name: 'Kickboxing', icon: '🥋', unit: 'min', mode: 'time', met: 10.0, color: 'red' },
  { name: 'Badminton', icon: '🏸', unit: 'min', mode: 'time', met: 5.5, color: 'teal' },
  { name: 'Basketball', icon: '🏀', unit: 'min', mode: 'time', met: 6.5, color: 'orange' },
  { name: 'Football', icon: '⚽', unit: 'min', mode: 'time', met: 7.0, color: 'green' },
  { name: 'Tennis', icon: '🎾', unit: 'min', mode: 'time', met: 7.3, color: 'cyan' },
  { name: 'Volleyball', icon: '🏐', unit: 'min', mode: 'time', met: 4.0, color: 'blue' },
  { name: 'Cricket', icon: '🏏', unit: 'min', mode: 'time', met: 4.5, color: 'amber' }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'seed-1', text: 'Great job. You hit your calorie burn goal yesterday.', time: '2h ago', read: false },
  { id: 'seed-2', text: 'Your 7-day streak is going strong. Keep it up.', time: '1d ago', read: false },
  { id: 'seed-3', text: 'New workout recommendation available.', time: '2d ago', read: true },
  { id: 'seed-4', text: 'Increase active minutes to accelerate goal timeline.', time: '4d ago', read: true }
];

const DAILY_REMINDER_STORAGE_KEY = 'fittrack-last-daily-reminder';
const ACHIEVEMENT_STORAGE_KEY = 'fittrack-seen-achievements';

function shortDate(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

function workoutMeta(name) {
  return WORKOUT_LIBRARY.find((x) => x.name === name) || WORKOUT_LIBRARY[0];
}

function calcWorkoutCalories(typeName, amount, weightKg, sets = 1) {
  const w = workoutMeta(typeName);
  const a = Number(amount) || 0;
  const s = Math.max(1, Number(sets) || 1);
  let activeMinutes = 0;

  if (w.mode === 'time') activeMinutes = a;
  else if (w.mode === 'time-sec') activeMinutes = a / 60;
  else activeMinutes = (a * (Number(w.secPerRep) || 2)) / 60;

  activeMinutes *= s;
  return calculateWorkoutCaloriesMET(w.met, weightKg, activeMinutes);
}

function deriveDurationMin(typeName, amount, sets = 1) {
  const w = workoutMeta(typeName);
  const a = Number(amount) || 0;
  const s = Math.max(1, Number(sets) || 1);
  if (w.mode === 'time') return a * s;
  if (w.mode === 'time-sec') return (a / 60) * s;
  return ((a * (Number(w.secPerRep) || 2)) / 60) * s;
}

function MiniBars({ values, labels, colorClass = 'bar-purple' }) {
  const max = Math.max(1, ...values);
  return (
    <div className="mini-bars">
      {values.map((v, idx) => (
        <div key={`${labels[idx]}-${idx}`} className="mini-col-wrap" title={`${labels[idx]}: ${v}`}>
          <div className={`mini-col ${colorClass}`} style={{ height: `${Math.max(8, (v / max) * 100)}%` }} />
          <span>{labels[idx]}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const { state, actions, auth } = useAppState();
  const [page, setPage] = useState('dashboard');

  const [workoutForm, setWorkoutForm] = useState({ date: toDateInputValue(new Date()), type: 'Running', amount: 40, sets: 1 });
  const [foodForm, setFoodForm] = useState({ date: toDateInputValue(new Date()), meal: 'Meal', caloriesConsumed: 650 });
  const [weightForm, setWeightForm] = useState({ date: toDateInputValue(new Date()), weight: state.profile.currentWeight });

  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [editingWeightId, setEditingWeightId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [timerType, setTimerType] = useState('Running');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const importInputRef = useRef(null);

  const [profileDraft, setProfileDraft] = useState({
    name: state.profile.name,
    age: state.profile.age,
    heightCm: state.profile.heightCm,
    gender: state.profile.gender || 'male'
  });
  const [goalsDraft, setGoalsDraft] = useState({ goalWeight: state.goals.goalWeight, weeklyWorkoutTarget: state.goals.weeklyWorkoutTarget });
  const [logSaveMsg, setLogSaveMsg] = useState('');
  const [authPage, setAuthPage] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '' });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [appNotifications, setAppNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [notificationPermission, setNotificationPermission] = useState(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return window.Notification.permission;
  });
  const useNormalizedCalories = state.settings?.useNormalizedCalories !== false;
  const avgWindowDays = Math.min(30, Math.max(3, Number(state.settings?.avgWindowDays) || 7));
  const projectionDays = Math.min(120, Math.max(7, Number(state.settings?.projectionDays) || 30));

  const pushNotification = useCallback((text) => {
    setAppNotifications((prev) => [
      {
        id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        time: 'just now',
        read: false
      },
      ...prev
    ].slice(0, 30));
  }, []);

  const sendBrowserNotification = useCallback((title, body) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (window.Notification.permission !== 'granted') return;
    window.Notification.close?.();
    // Browser-level alert for reminders and achievements.
    new window.Notification(title, { body });
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setLogSaveMsg('Browser alerts are not supported in this browser.');
      return;
    }

    const permission = await window.Notification.requestPermission();
    setNotificationPermission(permission);
    setLogSaveMsg(permission === 'granted' ? 'Browser alerts enabled.' : 'Browser alerts blocked.');
    setTimeout(() => setLogSaveMsg(''), 2200);
  }, []);

  useEffect(() => {
    if (!timerRunning) return undefined;
    const id = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    setProfileDraft({
      name: state.profile.name,
      age: state.profile.age,
      heightCm: state.profile.heightCm,
      gender: state.profile.gender || 'male'
    });
    setGoalsDraft({ goalWeight: state.goals.goalWeight, weeklyWorkoutTarget: state.goals.weeklyWorkoutTarget });
  }, [state.profile, state.goals]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const sortedWeights = useMemo(() => [...state.weightHistory].sort((a, b) => new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`)), [state.weightHistory]);

  const latestWeight = useMemo(() => {
    const raw = sortedWeights.length ? Number(sortedWeights[sortedWeights.length - 1].weight) : Number(state.profile.currentWeight);
    return Number.isFinite(raw) ? raw : 0;
  }, [sortedWeights, state.profile.currentWeight]);

  const startWeight = useMemo(() => {
    const raw = sortedWeights.length ? Number(sortedWeights[0].weight) : Number(state.profile.currentWeight);
    return Number.isFinite(raw) ? raw : latestWeight;
  }, [sortedWeights, state.profile.currentWeight, latestWeight]);

  const normalizedWorkouts = useMemo(() => {
    const weightKg = Number(state.profile.currentWeight) || 70;

    return state.workouts.map((w) => {
      const meta = workoutMeta(w.type);
      const sets = Math.max(1, Number(w.sets) || 1);
      let amount = Number(w.amount);

      if (!Number.isFinite(amount) || amount <= 0) {
        const durationMin = Math.max(0, Number(w.durationMin) || 0);
        if (meta.mode === 'time') amount = durationMin / sets;
        else if (meta.mode === 'time-sec') amount = (durationMin * 60) / sets;
        else amount = ((durationMin * 60) / (Number(meta.secPerRep) || 2)) / sets;
      }

      const caloriesBurned = calcWorkoutCalories(w.type, amount, weightKg, sets);
      const durationMin = deriveDurationMin(w.type, amount, sets);

      return {
        ...w,
        amount,
        sets,
        durationMin,
        caloriesBurned
      };
    });
  }, [state.workouts, state.profile.currentWeight]);

  const workoutsForCalculations = useMemo(() => (useNormalizedCalories ? normalizedWorkouts : state.workouts), [useNormalizedCalories, normalizedWorkouts, state.workouts]);

  const recentTotals = useMemo(
    () => getRecentDailyTotals(workoutsForCalculations, state.foodLogs, avgWindowDays),
    [workoutsForCalculations, state.foodLogs, avgWindowDays]
  );
  const avgWorkoutBurned = useMemo(() => recentTotals.burned.reduce((acc, v) => acc + v, 0) / recentTotals.burned.length, [recentTotals]);
  const avgConsumed = useMemo(() => recentTotals.consumed.reduce((acc, v) => acc + v, 0) / recentTotals.consumed.length, [recentTotals]);
  const bmr = useMemo(() => calculateBMR(state.profile), [state.profile]);
  const avgTotalBurned = useMemo(() => {
    const days = Math.max(1, recentTotals.burned.length);
    const totalBurnedAcrossWindow = recentTotals.burned.reduce((acc, activeBurn) => acc + bmr + activeBurn, 0);
    return totalBurnedAcrossWindow / days;
  }, [recentTotals, bmr]);

  const prediction = useMemo(
    () => calculatePrediction({ currentWeight: latestWeight, goalWeight: Number(state.goals.goalWeight), avgBurned: avgTotalBurned, avgConsumed }),
    [latestWeight, state.goals.goalWeight, avgTotalBurned, avgConsumed]
  );

  const completionPct = useMemo(() => {
    const goalWeight = Number(state.goals.goalWeight);
    if (!Number.isFinite(goalWeight)) return 0;

    const totalDelta = goalWeight - startWeight;
    if (Math.abs(totalDelta) >= 0.001) {
      const doneDelta = latestWeight - startWeight;
      const progress = (doneDelta / totalDelta) * 100;
      if (Number.isFinite(progress) && Math.abs(doneDelta) >= 0.001) {
        return Math.min(100, Math.max(0, progress));
      }
    }

    // Fallback when no start-to-current movement exists yet.
    if (goalWeight > 0 && latestWeight > 0) {
      const ratio = goalWeight < latestWeight ? (goalWeight / latestWeight) * 100 : (latestWeight / goalWeight) * 100;
      if (Number.isFinite(ratio)) return Math.min(100, Math.max(0, ratio));
    }

    return Math.abs(totalDelta) < 0.001 ? 100 : 0;
  }, [startWeight, latestWeight, state.goals.goalWeight]);

  const predictedPoints = useMemo(() => {
    const lastDate = sortedWeights.length ? sortedWeights[sortedWeights.length - 1].date : toDateInputValue(new Date());
    return buildPredictedSeries({ startDate: lastDate, currentWeight: latestWeight, dailyWeightLoss: prediction.dailyWeightLoss, days: projectionDays });
  }, [sortedWeights, latestWeight, prediction.dailyWeightLoss, projectionDays]);

  const chartData = useMemo(() => {
    const actual = sortedWeights.map((w) => ({ date: shortDate(w.date), actual: Number(w.weight), predicted: null }));
    const projected = predictedPoints.map((p) => ({ date: shortDate(p.date), actual: null, predicted: p.weight }));
    return [...actual, ...projected];
  }, [sortedWeights, predictedPoints]);

  const recentWorkouts = useMemo(() => workoutsForCalculations.slice(0, 6), [workoutsForCalculations]);
  const allWorkouts = useMemo(() => workoutsForCalculations, [workoutsForCalculations]);
  const allFoods = useMemo(() => state.foodLogs, [state.foodLogs]);

  const workoutsThisWeek = useMemo(() => {
    const dates = new Set(recentTotals.labels);
    return workoutsForCalculations.filter((w) => dates.has(w.date)).length;
  }, [workoutsForCalculations, recentTotals.labels]);

  const achievements = useMemo(() => {
    const target = Math.max(1, Number(state.goals.weeklyWorkoutTarget) || 1);
    const workoutBurnMax = workoutsForCalculations.reduce((max, w) => Math.max(max, Number(w.caloriesBurned) || 0), 0);

    return [
      {
        id: 'first-workout',
        title: 'First Workout Logged',
        detail: 'Start your journey by logging at least one workout.',
        unlocked: workoutsForCalculations.length >= 1
      },
      {
        id: 'weekly-goal',
        title: 'Weekly Target Reached',
        detail: `Complete ${target} workouts in your current weekly window.`,
        unlocked: workoutsThisWeek >= target
      },
      {
        id: 'high-burn',
        title: '500 Calorie Session',
        detail: 'Finish one workout with 500+ calories burned.',
        unlocked: workoutBurnMax >= 500
      },
      {
        id: 'consistent-weigh-ins',
        title: '7 Weight Entries',
        detail: 'Log your weight at least 7 times.',
        unlocked: sortedWeights.length >= 7
      },
      {
        id: 'goal-achieved',
        title: 'Goal Achieved',
        detail: 'Reach your goal weight based on tracked trend.',
        unlocked: Number(state.goals.goalWeight) > 0 && prediction.daysToGoal === 0
      }
    ];
  }, [state.goals.weeklyWorkoutTarget, state.goals.goalWeight, workoutsForCalculations, workoutsThisWeek, sortedWeights.length, prediction.daysToGoal]);

  const todayIso = toDateInputValue(new Date());
  const foodToday = useMemo(() => state.foodLogs.filter((f) => f.date === todayIso), [state.foodLogs, todayIso]);
  const workoutsToday = useMemo(() => workoutsForCalculations.filter((w) => w.date === todayIso), [workoutsForCalculations, todayIso]);
  const todayFoodTotal = useMemo(() => foodToday.reduce((acc, f) => acc + (Number(f.caloriesConsumed) || 0), 0), [foodToday]);

  const todayWorkoutBurn = useMemo(
    () => workoutsToday.reduce((acc, w) => acc + (Number(w.caloriesBurned) || 0), 0),
    [workoutsToday]
  );
  const todayTotalBurn = useMemo(() => bmr + todayWorkoutBurn, [bmr, todayWorkoutBurn]);
  const todayNetBalance = useMemo(() => todayTotalBurn - todayFoodTotal, [todayTotalBurn, todayFoodTotal]);

  useEffect(() => {
    if (!state.settings.remind) return;

    const lastReminderDate = localStorage.getItem(DAILY_REMINDER_STORAGE_KEY);
    if (lastReminderDate === todayIso) return;

    if (workoutsToday.length === 0) {
      pushNotification('Daily reminder: log one workout to keep your routine on track.');
      sendBrowserNotification('FitTrack Reminder', 'Log one workout today to keep your streak alive.');
    }

    localStorage.setItem(DAILY_REMINDER_STORAGE_KEY, todayIso);
  }, [state.settings.remind, todayIso, workoutsToday.length, pushNotification, sendBrowserNotification]);

  useEffect(() => {
    if (!state.settings.achieve) return;

    let seenIds = [];
    try {
      seenIds = JSON.parse(localStorage.getItem(ACHIEVEMENT_STORAGE_KEY) || '[]');
    } catch {
      seenIds = [];
    }

    const seenSet = new Set(Array.isArray(seenIds) ? seenIds : []);
    const newlyUnlocked = achievements.filter((a) => a.unlocked && !seenSet.has(a.id));
    if (!newlyUnlocked.length) return;

    newlyUnlocked.forEach((achievement) => {
      pushNotification(`Achievement unlocked: ${achievement.title}`);
      sendBrowserNotification('Achievement unlocked', achievement.title);
      seenSet.add(achievement.id);
    });

    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify([...seenSet]));
  }, [state.settings.achieve, achievements, pushNotification, sendBrowserNotification]);

  const insights = useMemo(() => {
    const list = [];
    if (prediction.daysToGoal === 0) {
      list.push('Goal achieved. Maintain this trend with a balanced routine.');
    } else if (prediction.dailyDeficit > 0) {
      list.push('You are in a calorie deficit. Keep this pace for steady fat loss.');
    } else {
      list.push('You are currently in a calorie surplus. Reduce intake or increase burn.');
    }

    if (workoutsThisWeek >= state.goals.weeklyWorkoutTarget) list.push('Great consistency this week. You have met your workout target.');
    else list.push(`You are ${state.goals.weeklyWorkoutTarget - workoutsThisWeek} workouts away from your weekly target.`);

    if (prediction.daysToGoal === 0) list.push('Your projected timeline is complete for the current goal.');
    else if (Number.isFinite(prediction.daysToGoal)) list.push(`At current pace, you may reach your goal in about ${prediction.daysToGoal} days.`);
    else list.push('No progress expected at this intake and burn level. Increase burn or reduce calories.');

    return list;
  }, [prediction, workoutsThisWeek, state.goals.weeklyWorkoutTarget]);

  const prediction200 = useMemo(() => calculateDaysForExtraBurn(prediction.remainingKg, prediction.dailyDeficit, 200), [prediction.remainingKg, prediction.dailyDeficit]);
  const prediction400 = useMemo(() => calculateDaysForExtraBurn(prediction.remainingKg, prediction.dailyDeficit, 400), [prediction.remainingKg, prediction.dailyDeficit]);

  const stats = useMemo(
    () => [
      { label: 'Passive Burn (BMR)', value: `${Math.round(bmr)} kcal`, hint: 'Per day from profile and gender' },
      { label: 'Today Active Burn', value: `${Math.round(todayWorkoutBurn)} kcal`, hint: 'Today workouts only' },
      { label: `Active Burn / Day (${avgWindowDays}D Avg)`, value: `${Math.round(avgWorkoutBurned)} kcal`, hint: `Rolling ${avgWindowDays}-day active average` },
      { label: `Total Burn / Day (${avgWindowDays}D Avg)`, value: `${Math.round(avgTotalBurned)} kcal`, hint: 'BMR + active average' },
      { label: `Avg Intake / Day (${avgWindowDays}D)`, value: `${Math.round(avgConsumed)} kcal`, hint: `Rolling ${avgWindowDays}-day food average` },
      { label: `Net Balance / Day (${avgWindowDays}D Avg)`, value: `${Math.round(prediction.dailyDeficit)} kcal`, hint: 'Average total burn minus average intake' },
      { label: 'Today Net Balance', value: `${Math.round(todayNetBalance)} kcal`, hint: 'Today total burn minus today intake' }
    ],
    [bmr, todayWorkoutBurn, avgWorkoutBurned, avgTotalBurned, avgConsumed, prediction.dailyDeficit, todayNetBalance, avgWindowDays]
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const workoutResults = workoutsForCalculations.filter((w) => w.type.toLowerCase().includes(q)).slice(0, 5).map((w) => ({ kind: 'Workout', id: w.id, label: `${w.type} - ${w.caloriesBurned} kcal` }));
    const foodResults = state.foodLogs.filter((f) => f.meal.toLowerCase().includes(q)).slice(0, 5).map((f) => ({ kind: 'Food', id: f.id, label: `${f.meal} - ${f.caloriesConsumed} kcal` }));
    return [...workoutResults, ...foodResults];
  }, [searchQuery, workoutsForCalculations, state.foodLogs]);

  const heatmapCells = useMemo(() => {
    const cells = [];
    const now = new Date();

    for (let week = 11; week >= 0; week -= 1) {
      for (let day = 0; day < 7; day += 1) {
        const d = new Date(now);
        d.setDate(now.getDate() - week * 7 - day);
        const iso = toDateInputValue(d);
        const burn = workoutsForCalculations.filter((w) => w.date === iso).reduce((acc, w) => acc + (Number(w.caloriesBurned) || 0), 0);
        let level = 'lv0';
        if (burn > 700) level = 'lv4';
        else if (burn > 500) level = 'lv3';
        else if (burn > 300) level = 'lv2';
        else if (burn > 120) level = 'lv1';
        cells.push({ date: iso, burn, level });
      }
    }

    return cells;
  }, [workoutsForCalculations]);

  const nutritionMini = useMemo(() => ({ labels: recentTotals.labels.map((d) => shortDate(d)), consumed: recentTotals.consumed, burned: recentTotals.burned }), [recentTotals]);
  const progressMini = useMemo(() => {
    const points = sortedWeights.slice(-10);
    return { labels: points.map((p) => shortDate(p.date)), values: points.map((p) => Number(p.weight)) };
  }, [sortedWeights]);

  const timerEstimatedBurn = useMemo(() => calcWorkoutCalories(timerType, timerSeconds / 60, Number(state.profile.currentWeight) || 70), [timerType, timerSeconds, state.profile.currentWeight]);
  const currentWorkoutMeta = useMemo(() => workoutMeta(workoutForm.type), [workoutForm.type]);
  const workoutEstimatedCals = useMemo(
    () => calcWorkoutCalories(workoutForm.type, workoutForm.amount, Number(state.profile.currentWeight) || 70, workoutForm.sets),
    [workoutForm.type, workoutForm.amount, workoutForm.sets, state.profile.currentWeight]
  );

  function resetWorkoutForm() {
    setWorkoutForm({ date: toDateInputValue(new Date()), type: 'Running', amount: 40, sets: 1 });
    setEditingWorkoutId(null);
  }

  function resetFoodForm() {
    setFoodForm({ date: toDateInputValue(new Date()), meal: 'Meal', caloriesConsumed: 650 });
    setEditingFoodId(null);
  }

  function resetWeightForm() {
    setWeightForm({ date: toDateInputValue(new Date()), weight: state.profile.currentWeight });
    setEditingWeightId(null);
  }

  function handleAddWorkout(e) {
    e.preventDefault();
    const amount = Number(workoutForm.amount) || 0;
    const sets = Math.max(1, Number(workoutForm.sets) || 1);
    const payload = {
      ...workoutForm,
      amount,
      sets,
      unit: currentWorkoutMeta.unit,
      durationMin: deriveDurationMin(workoutForm.type, amount, sets),
      caloriesBurned: calcWorkoutCalories(workoutForm.type, amount, Number(state.profile.currentWeight) || 70, sets)
    };

    if (editingWorkoutId) actions.updateWorkout(editingWorkoutId, payload);
    else actions.addWorkout(payload);
    resetWorkoutForm();
  }

  function handleAddFood(e) {
    e.preventDefault();
    const payload = { ...foodForm, caloriesConsumed: Number(foodForm.caloriesConsumed) };
    if (editingFoodId) actions.updateFoodLog(editingFoodId, payload);
    else actions.addFoodLog(payload);
    resetFoodForm();
  }

  function handleAddWeight(e) {
    e.preventDefault();
    const weight = Number(weightForm.weight);
    const payload = { ...weightForm, weight };
    if (editingWeightId) actions.updateWeightLog(editingWeightId, payload);
    else actions.addWeightLog(payload);
    actions.updateProfile({ currentWeight: weight });
    resetWeightForm();
  }

  function handleSaveProfileGoals(e) {
    e.preventDefault();
    actions.updateProfile({
      name: profileDraft.name,
      age: Number(profileDraft.age) || 0,
      heightCm: Number(profileDraft.heightCm) || 0,
      gender: profileDraft.gender || 'male'
    });
    actions.updateGoals({ goalWeight: Number(goalsDraft.goalWeight) || 0, weeklyWorkoutTarget: Number(goalsDraft.weeklyWorkoutTarget) || 1 });
    setLogSaveMsg('Profile and goals saved.');
    setTimeout(() => setLogSaveMsg(''), 2200);
  }

  function editWorkout(w) {
    setPage('dashboard');
    setWorkoutForm({
      date: w.date,
      type: w.type,
      amount: w.amount ?? (w.unit === 'sec' ? Math.round((Number(w.durationMin) || 0) * 60) : Math.round(Number(w.durationMin) || 0)),
      sets: w.sets ?? 1
    });
    setEditingWorkoutId(w.id);
  }

  function editFood(f) {
    setPage('dashboard');
    setFoodForm({ date: f.date, meal: f.meal, caloriesConsumed: f.caloriesConsumed });
    setEditingFoodId(f.id);
  }

  function editWeight(w) {
    setPage('dashboard');
    setWeightForm({ date: w.date, weight: w.weight });
    setEditingWeightId(w.id);
  }

  function toggleSetting(key) {
    actions.updateSettings({ [key]: !state.settings[key] });
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fittrack-data.json';
    a.click();
  }

  async function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON structure');
      actions.importAllData(parsed);
      setLogSaveMsg('Data imported successfully.');
    } catch {
      setLogSaveMsg('Import failed. Please select a valid FitTrack JSON export.');
    } finally {
      event.target.value = '';
      setTimeout(() => setLogSaveMsg(''), 2600);
    }
  }

  function handleClearAllData() {
    const confirmed = window.confirm('Are you sure you want to clear all data? This cannot be undone.');
    if (!confirmed) return;
    actions.clearAllData();
    setLogSaveMsg('All data cleared.');
    setTimeout(() => setLogSaveMsg(''), 2200);
  }

  function goTo(pageName, closeFab = true) {
    setPage(pageName);
    if (closeFab) setFabOpen(false);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  async function handleSignUp() {
    const email = signupForm.email.trim();
    const password = signupForm.password;
    if (!email || !password) {
      setLogSaveMsg('Enter email and password to sign up.');
      return;
    }

    setAuthBusy(true);
    try {
      await auth.signUp(email, password);
      setLogSaveMsg('Account created. If email confirmation is enabled, verify email and then log in.');
      setAuthPage('login');
      setLoginForm((prev) => ({ ...prev, email }));
    } catch (err) {
      setLogSaveMsg(err?.message || 'Sign up failed.');
    } finally {
      setAuthBusy(false);
      setTimeout(() => setLogSaveMsg(''), 3500);
    }
  }

  async function handleSignIn() {
    const email = loginForm.email.trim();
    const password = loginForm.password;
    if (!email || !password) {
      setLogSaveMsg('Enter email and password to log in.');
      return;
    }

    setAuthBusy(true);
    try {
      await auth.signIn(email, password);
      setLogSaveMsg('Logged in. Cloud sync is active.');
    } catch (err) {
      setLogSaveMsg(err?.message || 'Login failed.');
    } finally {
      setAuthBusy(false);
      setTimeout(() => setLogSaveMsg(''), 2500);
    }
  }

  async function handleSignOut() {
    setAuthBusy(true);
    try {
      await auth.signOut();
      setLoginForm({ email: '', password: '' });
      setSignupForm({ email: '', password: '' });
      setAuthPage('login');
      setLogSaveMsg('Signed out.');
    } catch (err) {
      setLogSaveMsg(err?.message || 'Sign out failed.');
    } finally {
      setAuthBusy(false);
      setTimeout(() => setLogSaveMsg(''), 2200);
    }
  }

  function cloudStatusLabel(status) {
    if (status === 'syncing') return 'Syncing...';
    if (status === 'ready') return 'Synced';
    if (status === 'error') return 'Sync error';
    if (status === 'disabled') return 'Supabase not configured';
    return 'Idle';
  }

  if (auth.isConfigured && !auth.authLoading && !auth.user) {
    return (
      <div className="app-shell auth-shell" data-theme={theme}>
        <section className="auth-page">
          <article className="auth-card">
            <p className="eyebrow">FitTrack Account</p>
            <h2>{authPage === 'login' ? 'Login' : 'Create account'}</h2>
            <p className="muted" style={{ marginTop: 6 }}>
              {authPage === 'login'
                ? 'Log in to access your cloud profile and synced workout data.'
                : 'Sign up once, then keep your profile and exercise history synced on any device.'}
            </p>

            <div className="auth-switch" style={{ marginTop: 14 }}>
              <button type="button" className={authPage === 'login' ? 'auth-tab active' : 'auth-tab btn-muted'} onClick={() => setAuthPage('login')}>Login</button>
              <button type="button" className={authPage === 'signup' ? 'auth-tab active' : 'auth-tab btn-muted'} onClick={() => setAuthPage('signup')}>Sign Up</button>
            </div>

            {authPage === 'login' ? (
              <form className="auth-form" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <div className="password-field">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    aria-label={showLoginPassword ? 'Hide login password' : 'Show login password'}
                  >
                    {showLoginPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button type="submit" disabled={authBusy}>{authBusy ? 'Logging in...' : 'Login'}</button>
              </form>
            ) : (
              <form className="auth-form" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <div className="password-field">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Password (min 6 chars)"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm((prev) => ({ ...prev, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowSignupPassword((prev) => !prev)}
                    aria-label={showSignupPassword ? 'Hide sign up password' : 'Show sign up password'}
                  >
                    {showSignupPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button type="submit" disabled={authBusy}>{authBusy ? 'Creating account...' : 'Create Account'}</button>
              </form>
            )}

            {(logSaveMsg || auth.authError) && (
              <p className="muted" style={{ marginTop: 10 }}>{auth.authError || logSaveMsg}</p>
            )}

            <div className="row-actions" style={{ marginTop: 12 }}>
              <button type="button" className="btn-muted" onClick={toggleTheme}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
            </div>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <DashboardLayout title="FitTrack Predictive Coach" subtitle="Premium Fitness Intelligence" theme={theme}>
        <Navbar pages={PAGES} page={page} onNavigate={(p) => goTo(p, false)} isLight={theme === 'light'} onToggleTheme={toggleTheme} />

      {page === 'dashboard' && (
        <>
          <section className="premium-hero-grid apple-reveal apple-reveal-1">
            <GlassCard>
              <div className="premium-ring-head">
                <div>
                  <p className="eyebrow">Goal Progress</p>
                  <h3>{latestWeight.toFixed(1)} kg to {Number(state.goals.goalWeight).toFixed(1)} kg</h3>
                  <p className="muted" style={{ marginTop: 6 }}>
                    ETA: {prediction.daysToGoal === 0 ? 'Goal achieved' : Number.isFinite(prediction.daysToGoal) ? `${prediction.daysToGoal} days` : 'No progress'}
                  </p>
                </div>
                <ProgressRing value={completionPct} />
              </div>
            </GlassCard>

            <GlassCard>
              <h3>Prediction Matrix</h3>
              <div className="premium-prediction-grid">
                <div className="prediction-item"><span>Current pace</span><strong>{prediction.daysToGoal === 0 ? 'Goal achieved' : Number.isFinite(prediction.daysToGoal) ? `${prediction.daysToGoal} days` : 'No progress'}</strong></div>
                <div className="prediction-item"><span>+200 kcal/day</span><strong>{prediction200 === 0 ? 'Goal achieved' : Number.isFinite(prediction200) ? `${prediction200} days` : 'No progress'}</strong></div>
                <div className="prediction-item"><span>+400 kcal/day</span><strong>{prediction400 === 0 ? 'Goal achieved' : Number.isFinite(prediction400) ? `${prediction400} days` : 'No progress'}</strong></div>
              </div>
              <p className="muted" style={{ marginTop: 10 }}>
                {prediction.dailyDeficit >= 0
                  ? `Calorie deficit: ${Math.round(prediction.dailyDeficit)} kcal/day`
                  : `Calorie surplus: ${Math.abs(Math.round(prediction.dailyDeficit))} kcal/day`}
              </p>
            </GlassCard>
          </section>

          <section className="premium-stat-grid apple-reveal apple-reveal-2">
            {stats.map((item) => (
              <StatCard key={item.label} label={item.label} value={item.value} hint={item.hint} />
            ))}
          </section>

          <section className="premium-chart-grid apple-reveal apple-reveal-3">
            <Suspense fallback={<GlassCard><h3>Loading chart...</h3><p className="muted">Preparing trend analysis.</p></GlassCard>}>
              <SmoothChartLazy data={chartData} goalWeight={Number(state.goals.goalWeight)} />
            </Suspense>
            <InsightCard insights={insights} />
          </section>

          <section className="premium-chart-grid apple-reveal apple-reveal-4">
            <WorkoutList workouts={recentWorkouts} />
            <QuickLogForm
              workoutForm={workoutForm}
              foodForm={foodForm}
              weightForm={weightForm}
              setWorkoutForm={setWorkoutForm}
              setFoodForm={setFoodForm}
              setWeightForm={setWeightForm}
              handleAddWorkout={handleAddWorkout}
              handleAddFood={handleAddFood}
              handleAddWeight={handleAddWeight}
              workoutEstimatedCals={workoutEstimatedCals}
              currentWorkoutMeta={currentWorkoutMeta}
              workoutLibrary={WORKOUT_LIBRARY}
              editingWorkoutId={editingWorkoutId}
              editingFoodId={editingFoodId}
              editingWeightId={editingWeightId}
              resetWorkoutForm={resetWorkoutForm}
              resetFoodForm={resetFoodForm}
              resetWeightForm={resetWeightForm}
            />
          </section>

          <NowTrackingBar calories={todayNetBalance} trend={prediction.dailyDeficit >= 0 ? 'Deficit mode' : 'Surplus mode'} />
          {state.settings?.bmr && <p className="muted" style={{ marginTop: 8 }}>BMR ({(state.profile.gender || 'male').toLowerCase()}): {bmr} kcal/day</p>}
        </>
      )}

      {page === 'log' && (
        <section className="glass-card profile-section">
          <h3>Profile and Goals</h3>
          <form onSubmit={handleSaveProfileGoals}>
            <div className="field-grid profile-grid">
              <input type="text" placeholder="Name" value={profileDraft.name} onChange={(e) => setProfileDraft((v) => ({ ...v, name: e.target.value }))} />
              <input type="number" placeholder="Age" value={profileDraft.age} onChange={(e) => setProfileDraft((v) => ({ ...v, age: e.target.value }))} />
              <select value={profileDraft.gender} onChange={(e) => setProfileDraft((v) => ({ ...v, gender: e.target.value }))}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="number" placeholder="Height cm" value={profileDraft.heightCm} onChange={(e) => setProfileDraft((v) => ({ ...v, heightCm: e.target.value }))} />
              <input type="number" step="0.1" placeholder="Goal weight kg" value={goalsDraft.goalWeight} onChange={(e) => setGoalsDraft((v) => ({ ...v, goalWeight: e.target.value }))} />
              <input type="number" placeholder="Weekly workout target" value={goalsDraft.weeklyWorkoutTarget} onChange={(e) => setGoalsDraft((v) => ({ ...v, weeklyWorkoutTarget: e.target.value }))} />
            </div>
            <div className="row-actions" style={{ marginTop: 10 }}>
              <button type="submit">Save Profile and Goals</button>
              {logSaveMsg && <span className="muted">{logSaveMsg}</span>}
            </div>
          </form>
        </section>
      )}

      {page === 'workouts' && (
        <section className="glass-card">
          <h3>All Workouts</h3>
          <div className="list-stack">
            {allWorkouts.length === 0 && <p className="muted">No workouts logged yet.</p>}
            {allWorkouts.map((w) => (
              <article className="workout-row" key={w.id}>
                <div>
                  <p className="row-title"><span className={`type-dot ${workoutMeta(w.type).color}`} /> {w.type}</p>
                  <p className="muted">{w.date} · {w.amount ?? w.durationMin} {w.unit || 'min'} · {w.sets ?? 1} sets</p>
                </div>
                <div className="row-actions compact">
                  <strong>{w.caloriesBurned} kcal</strong>
                  <button type="button" className="btn-muted" onClick={() => editWorkout(w)}>Edit</button>
                  <button type="button" className="btn-danger" onClick={() => actions.deleteWorkout(w.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {page === 'nutrition' && (
        <section className="dashboard-grid">
          <div className="glass-card">
            <h3>Today Food</h3>
            <div className="list-stack">
              {foodToday.length === 0 && <p className="muted">No food logged today.</p>}
              {foodToday.map((f) => (
                <article className="workout-row" key={f.id}>
                  <div>
                    <p className="row-title">{f.meal}</p>
                    <p className="muted">{f.date}</p>
                  </div>
                  <div className="row-actions compact">
                    <strong>{f.caloriesConsumed} kcal</strong>
                    <button type="button" className="btn-muted" onClick={() => editFood(f)}>Edit</button>
                    <button type="button" className="btn-danger" onClick={() => actions.deleteFoodLog(f.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="summary-row"><span>Total Today</span><strong>{todayFoodTotal} kcal</strong></div>

            <h4 className="subhead">7-Day Intake vs Burn</h4>
            <MiniBars values={nutritionMini.consumed} labels={nutritionMini.labels} colorClass="bar-cyan" />
            <MiniBars values={nutritionMini.burned} labels={nutritionMini.labels} colorClass="bar-green" />
          </div>

          <div className="glass-card">
            <h3>Recent Food Logs</h3>
            <div className="list-stack">
              {allFoods.slice(0, 10).map((f) => (
                <article className="workout-row" key={f.id}>
                  <div>
                    <p className="row-title">{f.meal}</p>
                    <p className="muted">{f.date}</p>
                  </div>
                  <div className="row-actions compact">
                    <strong>{f.caloriesConsumed} kcal</strong>
                    <button type="button" className="btn-muted" onClick={() => editFood(f)}>Edit</button>
                    <button type="button" className="btn-danger" onClick={() => actions.deleteFoodLog(f.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'progress' && (
        <section className="dashboard-grid">
          <div className="glass-card">
            <h3>Weight Progress</h3>
            <div className="summary-row"><span>Current</span><strong>{latestWeight.toFixed(1)} kg</strong></div>
            <div className="summary-row"><span>Goal</span><strong>{Number(state.goals.goalWeight).toFixed(1)} kg</strong></div>
            <div className="summary-row"><span>Change</span><strong>{(latestWeight - startWeight).toFixed(1)} kg</strong></div>
            <div className="summary-row"><span>Remaining</span><strong>{prediction.remainingKg.toFixed(1)} kg</strong></div>

            <h4 className="subhead">Weight Trend (recent)</h4>
            <MiniBars values={progressMini.values.map((v) => Math.round(v * 10))} labels={progressMini.labels} colorClass="bar-purple" />
          </div>

          <div className="glass-card">
            <h3>Weight History</h3>
            <div className="list-stack">
              {sortedWeights.map((w) => (
                <article className="workout-row" key={w.id}>
                  <span>{w.date}</span>
                  <div className="row-actions compact">
                    <strong>{Number(w.weight).toFixed(1)} kg</strong>
                    <button type="button" className="btn-muted" onClick={() => editWeight(w)}>Edit</button>
                    <button type="button" className="btn-danger" onClick={() => actions.deleteWeightLog(w.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'calendar' && (
        <section className="glass-card">
          <h3>Activity Heatmap</h3>
          <p className="muted">Last 12 weeks of activity</p>
          <div className="heatmap-grid">
            {heatmapCells.map((c) => <div key={c.date} className={`heat-cell ${c.level}`} title={`${c.date}: ${c.burn} kcal`} />)}
          </div>
          <div className="legend-row">
            <span>Less</span>
            <span className="heat-cell lv0" />
            <span className="heat-cell lv1" />
            <span className="heat-cell lv2" />
            <span className="heat-cell lv3" />
            <span className="heat-cell lv4" />
            <span>More</span>
          </div>
        </section>
      )}

      {page === 'timer' && (
        <section className="dashboard-grid">
          <div className="glass-card">
            <h3>Workout Timer</h3>
            <div className="timer-value">{formatTime(timerSeconds)}</div>
            <p className="muted">{timerType}</p>
            <div className="field-grid">
              <select value={timerType} onChange={(e) => setTimerType(e.target.value)}>
                {WORKOUT_LIBRARY.map((w) => <option key={w.name} value={w.name}>{w.icon} {w.name}</option>)}
              </select>
            </div>
            <div className="timer-controls">
              <button type="button" onClick={() => setTimerRunning((v) => !v)}>{timerRunning ? 'Pause' : 'Start'}</button>
              <button type="button" onClick={() => { setTimerRunning(false); setTimerSeconds(0); setLaps([]); }}>Reset</button>
              <button type="button" onClick={() => { if (timerSeconds > 0) setLaps((prev) => [...prev, formatTime(timerSeconds)]); }}>Lap</button>
            </div>
            <p className="muted">Estimated burn: {timerEstimatedBurn} kcal</p>
          </div>
          <div className="glass-card">
            <h3>Lap Times</h3>
            <div className="list-stack">
              {laps.length === 0 && <p className="muted">No laps recorded.</p>}
              {laps.map((lap, idx) => <article className="workout-row" key={`${lap}-${idx}`}><span>Lap {idx + 1}</span><strong>{lap}</strong></article>)}
            </div>
          </div>
        </section>
      )}

      {page === 'search' && (
        <section className="glass-card">
          <h3>Search</h3>
          <input type="text" placeholder="Search workouts and meals" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="list-stack" style={{ marginTop: 12 }}>
            {searchQuery.trim() && searchResults.length === 0 && <p className="muted">No results found.</p>}
            {searchResults.map((r, idx) => <article className="workout-row" key={`${r.kind}-${idx}`}><span>{r.kind}</span><strong>{r.label}</strong></article>)}
          </div>
        </section>
      )}

      {page === 'notifications' && (
        <section className="dashboard-grid">
          <div className="glass-card">
            <h3>Notifications</h3>
            <div className="list-stack" style={{ marginTop: 12 }}>
              {appNotifications.length === 0 && <p className="muted">No notifications yet.</p>}
              {appNotifications.map((n) => (
                <article className="notif-row" key={n.id}>
                  <span className={`notif-dot ${n.read ? 'read' : ''}`} />
                  <div>
                    <p>{n.text}</p>
                    <p className="muted">{n.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3>Achievements</h3>
            <p className="muted" style={{ marginTop: 8 }}>Unlock milestones and receive alerts when enabled.</p>
            <div className="list-stack" style={{ marginTop: 12 }}>
              {achievements.map((a) => (
                <article className={`achievement-row ${a.unlocked ? 'unlocked' : 'locked'}`} key={a.id}>
                  <div>
                    <p className="row-title">{a.title}</p>
                    <p className="muted">{a.detail}</p>
                  </div>
                  <strong>{a.unlocked ? 'Unlocked' : 'Locked'}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'settings' && (
        <section className="glass-card">
          <h3>Settings</h3>

          <div className="auth-box" style={{ marginTop: 10, marginBottom: 12 }}>
            <h4 style={{ margin: 0 }}>Account and Cloud Sync</h4>
            {!auth.isConfigured && <p className="muted" style={{ marginTop: 8 }}>Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.</p>}

            {auth.isConfigured && (
              <>
                <p className="muted" style={{ marginTop: 8 }}>
                  Status: {auth.authLoading ? 'Checking session...' : cloudStatusLabel(auth.cloudSyncStatus)}
                </p>
                <p className="muted" style={{ marginTop: 6 }}>Signed in as {auth.user?.email || 'Unknown user'}</p>
                <div className="row-actions" style={{ marginTop: 8 }}>
                  <button type="button" onClick={handleSignOut} disabled={authBusy}>Sign Out</button>
                </div>
                {auth.authError && <p className="muted" style={{ marginTop: 8 }}>{auth.authError}</p>}
              </>
            )}
          </div>

          <div className="settings-grid">
            <article className="setting-row"><div><p>Daily reminders</p><p className="muted">Get prompted to log workouts</p></div><button type="button" className={`modern-toggle ${state.settings.remind ? 'is-on' : 'is-off'}`} onClick={() => toggleSetting('remind')} aria-pressed={state.settings.remind}><span className="modern-toggle-thumb" /><span className="modern-toggle-text">{state.settings.remind ? 'Enabled' : 'Disabled'}</span></button></article>
            <article className="setting-row"><div><p>Achievement alerts</p><p className="muted">Celebrate your milestones</p></div><button type="button" className={`modern-toggle ${state.settings.achieve ? 'is-on' : 'is-off'}`} onClick={() => toggleSetting('achieve')} aria-pressed={state.settings.achieve}><span className="modern-toggle-thumb" /><span className="modern-toggle-text">{state.settings.achieve ? 'Enabled' : 'Disabled'}</span></button></article>
            <article className="setting-row"><div><p>Imperial units</p><p className="muted">Switch to lbs</p></div><button type="button" className={`modern-toggle ${state.settings.imperial ? 'is-on' : 'is-off'}`} onClick={() => toggleSetting('imperial')} aria-pressed={state.settings.imperial}><span className="modern-toggle-thumb" /><span className="modern-toggle-text">{state.settings.imperial ? 'Enabled' : 'Disabled'}</span></button></article>
            <article className="setting-row"><div><p>Show BMR in header</p><p className="muted">Display passive burn metric</p></div><button type="button" className={`modern-toggle ${state.settings.bmr ? 'is-on' : 'is-off'}`} onClick={() => toggleSetting('bmr')} aria-pressed={state.settings.bmr}><span className="modern-toggle-thumb" /><span className="modern-toggle-text">{state.settings.bmr ? 'Enabled' : 'Disabled'}</span></button></article>
            <article className="setting-row"><div><p>Optimized calorie engine</p><p className="muted">Recompute legacy workouts for consistent active burn</p></div><button type="button" className={`modern-toggle ${useNormalizedCalories ? 'is-on' : 'is-off'}`} onClick={() => toggleSetting('useNormalizedCalories')} aria-pressed={useNormalizedCalories}><span className="modern-toggle-thumb" /><span className="modern-toggle-text">{useNormalizedCalories ? 'Enabled' : 'Disabled'}</span></button></article>
            <article className="setting-row">
              <div>
                <p>Browser alerts permission</p>
                <p className="muted">Current: {notificationPermission === 'unsupported' ? 'Not supported' : notificationPermission}</p>
              </div>
              <button
                type="button"
                className={`modern-toggle ${notificationPermission === 'granted' ? 'is-on' : 'is-off'}`}
                onClick={requestNotificationPermission}
                disabled={notificationPermission === 'granted' || notificationPermission === 'unsupported'}
                aria-pressed={notificationPermission === 'granted'}
              >
                <span className="modern-toggle-thumb" />
                <span className="modern-toggle-text">{notificationPermission === 'granted' ? 'Enabled' : 'Enable Alerts'}</span>
              </button>
            </article>
            <article className="setting-row">
              <div>
                <p>Averaging window</p>
                <p className="muted">Stabilize trends with 7 or 14 day averages</p>
              </div>
              <div className="row-actions compact">
                <button type="button" className={`segment-btn ${avgWindowDays === 7 ? 'is-active' : 'is-idle'}`} onClick={() => actions.updateSettings({ avgWindowDays: 7 })}>7D</button>
                <button type="button" className={`segment-btn ${avgWindowDays === 14 ? 'is-active' : 'is-idle'}`} onClick={() => actions.updateSettings({ avgWindowDays: 14 })}>14D</button>
              </div>
            </article>
            <article className="setting-row">
              <div>
                <p>Prediction horizon</p>
                <p className="muted">Future chart projection length</p>
              </div>
              <div className="row-actions compact">
                <button type="button" className={`segment-btn ${projectionDays === 30 ? 'is-active' : 'is-idle'}`} onClick={() => actions.updateSettings({ projectionDays: 30 })}>30D</button>
                <button type="button" className={`segment-btn ${projectionDays === 60 ? 'is-active' : 'is-idle'}`} onClick={() => actions.updateSettings({ projectionDays: 60 })}>60D</button>
                <button type="button" className={`segment-btn ${projectionDays === 90 ? 'is-active' : 'is-idle'}`} onClick={() => actions.updateSettings({ projectionDays: 90 })}>90D</button>
              </div>
            </article>
            <article className="setting-row"><div><p>Export Data</p><p className="muted">Download JSON backup</p></div><button type="button" onClick={exportData}>Export</button></article>
            <article className="setting-row">
              <div>
                <p>Import Data</p>
                <p className="muted">Restore from a FitTrack JSON backup</p>
              </div>
              <>
                <input ref={importInputRef} type="file" accept="application/json,.json" onChange={importData} style={{ display: 'none' }} />
                <button type="button" onClick={() => importInputRef.current?.click()}>Import</button>
              </>
            </article>
            <article className="setting-row"><div><p>Clear All Data</p><p className="muted">Reset app state</p></div><button type="button" className="btn-danger" onClick={handleClearAllData}>Clear</button></article>
          </div>
          {logSaveMsg && <p className="muted" style={{ marginTop: 10 }}>{logSaveMsg}</p>}
        </section>
      )}

      <div className={`fab-wrap ${fabOpen ? 'open' : ''}`}>
        <div className="fab-menu">
          <button type="button" onClick={() => goTo('log')} className="fab-action">Log Workout</button>
          <button type="button" onClick={() => goTo('nutrition')} className="fab-action">Log Meal</button>
          <button type="button" onClick={() => goTo('progress')} className="fab-action">Log Weight</button>
          <button type="button" onClick={() => goTo('timer')} className="fab-action">Start Timer</button>
        </div>
        <button type="button" className="fab-main" onClick={() => setFabOpen((v) => !v)}>{fabOpen ? 'x' : '+'}</button>
      </div>
      </DashboardLayout>
    </div>
  );
}

export default App;
