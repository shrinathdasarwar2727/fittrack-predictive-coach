import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
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
  { name: 'Jump Rope', icon: '🪢', unit: 'jumps', mode: 'count', met: 12.3, secPerRep: 0.5, color: 'pink' },
  { name: 'Push-ups', icon: '💪', unit: 'reps', mode: 'count', met: 3.8, secPerRep: 2.0, color: 'red' },
  { name: 'Plank', icon: '🧱', unit: 'sec', mode: 'time-sec', met: 4.0, color: 'indigo' },
  { name: 'Squats', icon: '🦵', unit: 'reps', mode: 'count', met: 5.0, secPerRep: 3.0, color: 'emerald' }
];

const NOTIFICATIONS = [
  { text: 'Great job. You hit your calorie burn goal yesterday.', time: '2h ago', read: false },
  { text: 'Your 7-day streak is going strong. Keep it up.', time: '1d ago', read: false },
  { text: 'New workout recommendation available.', time: '2d ago', read: true },
  { text: 'Increase active minutes to accelerate goal timeline.', time: '4d ago', read: true }
];

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
  const { state, actions } = useAppState();
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

  const [profileDraft, setProfileDraft] = useState({
    name: state.profile.name,
    age: state.profile.age,
    heightCm: state.profile.heightCm,
    gender: state.profile.gender || 'male'
  });
  const [goalsDraft, setGoalsDraft] = useState({ goalWeight: state.goals.goalWeight, weeklyWorkoutTarget: state.goals.weeklyWorkoutTarget });
  const [logSaveMsg, setLogSaveMsg] = useState('');
  const useNormalizedCalories = state.settings?.useNormalizedCalories !== false;
  const avgWindowDays = Math.min(30, Math.max(3, Number(state.settings?.avgWindowDays) || 7));
  const projectionDays = Math.min(120, Math.max(7, Number(state.settings?.projectionDays) || 30));

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

  const todayIso = toDateInputValue(new Date());
  const foodToday = useMemo(() => state.foodLogs.filter((f) => f.date === todayIso), [state.foodLogs, todayIso]);
  const todayFoodTotal = useMemo(() => foodToday.reduce((acc, f) => acc + (Number(f.caloriesConsumed) || 0), 0), [foodToday]);

  const todayWorkoutBurn = useMemo(
    () => workoutsForCalculations.filter((w) => w.date === todayIso).reduce((acc, w) => acc + (Number(w.caloriesBurned) || 0), 0),
    [workoutsForCalculations, todayIso]
  );
  const todayTotalBurn = useMemo(() => bmr + todayWorkoutBurn, [bmr, todayWorkoutBurn]);
  const todayNetBalance = useMemo(() => todayTotalBurn - todayFoodTotal, [todayTotalBurn, todayFoodTotal]);

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

  function goTo(pageName, closeFab = true) {
    setPage(pageName);
    if (closeFab) setFabOpen(false);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
        <section className="glass-card">
          <h3>Notifications</h3>
          <div className="list-stack" style={{ marginTop: 12 }}>
            {NOTIFICATIONS.map((n, idx) => (
              <article className="notif-row" key={`${n.time}-${idx}`}>
                <span className={`notif-dot ${n.read ? 'read' : ''}`} />
                <div>
                  <p>{n.text}</p>
                  <p className="muted">{n.time}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {page === 'settings' && (
        <section className="glass-card">
          <h3>Settings</h3>
          <div className="settings-grid">
            <article className="setting-row"><div><p>Daily reminders</p><p className="muted">Get prompted to log workouts</p></div><button type="button" onClick={() => toggleSetting('remind')}>{state.settings.remind ? 'ON' : 'OFF'}</button></article>
            <article className="setting-row"><div><p>Achievement alerts</p><p className="muted">Celebrate your milestones</p></div><button type="button" onClick={() => toggleSetting('achieve')}>{state.settings.achieve ? 'ON' : 'OFF'}</button></article>
            <article className="setting-row"><div><p>Imperial units</p><p className="muted">Switch to lbs</p></div><button type="button" onClick={() => toggleSetting('imperial')}>{state.settings.imperial ? 'ON' : 'OFF'}</button></article>
            <article className="setting-row"><div><p>Show BMR in header</p><p className="muted">Display passive burn metric</p></div><button type="button" onClick={() => toggleSetting('bmr')}>{state.settings.bmr ? 'ON' : 'OFF'}</button></article>
            <article className="setting-row"><div><p>Optimized calorie engine</p><p className="muted">Recompute legacy workouts for consistent active burn</p></div><button type="button" onClick={() => toggleSetting('useNormalizedCalories')}>{useNormalizedCalories ? 'ON' : 'OFF'}</button></article>
            <article className="setting-row">
              <div>
                <p>Averaging window</p>
                <p className="muted">Stabilize trends with 7 or 14 day averages</p>
              </div>
              <div className="row-actions compact">
                <button type="button" className={avgWindowDays === 7 ? '' : 'btn-muted'} onClick={() => actions.updateSettings({ avgWindowDays: 7 })}>7D</button>
                <button type="button" className={avgWindowDays === 14 ? '' : 'btn-muted'} onClick={() => actions.updateSettings({ avgWindowDays: 14 })}>14D</button>
              </div>
            </article>
            <article className="setting-row">
              <div>
                <p>Prediction horizon</p>
                <p className="muted">Future chart projection length</p>
              </div>
              <div className="row-actions compact">
                <button type="button" className={projectionDays === 30 ? '' : 'btn-muted'} onClick={() => actions.updateSettings({ projectionDays: 30 })}>30D</button>
                <button type="button" className={projectionDays === 60 ? '' : 'btn-muted'} onClick={() => actions.updateSettings({ projectionDays: 60 })}>60D</button>
                <button type="button" className={projectionDays === 90 ? '' : 'btn-muted'} onClick={() => actions.updateSettings({ projectionDays: 90 })}>90D</button>
              </div>
            </article>
            <article className="setting-row"><div><p>Export Data</p><p className="muted">Download JSON backup</p></div><button type="button" onClick={exportData}>Export</button></article>
            <article className="setting-row"><div><p>Clear All Data</p><p className="muted">Reset app state</p></div><button type="button" className="btn-danger" onClick={actions.clearAllData}>Clear</button></article>
          </div>
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
