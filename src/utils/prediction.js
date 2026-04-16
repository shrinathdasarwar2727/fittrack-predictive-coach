export const KCAL_PER_KG = 7700;

export function calculateBMR(profile) {
  const age = Number(profile?.age) || 0;
  const height = Number(profile?.heightCm) || 0;
  const weight = Number(profile?.currentWeight) || 0;
  const gender = (profile?.gender || 'male').toLowerCase();

  // Mifflin-St Jeor equation
  const genderOffset = gender === 'female' ? -161 : 5;
  const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
  // Enforce a realistic floor so deficits are not overestimated for low-input profiles.
  return Math.max(1200, bmr);
}

export function calculateWorkoutCaloriesMET(met, weightKg, timeMinutes) {
  const m = Number(met) || 0;
  const w = Number(weightKg) || 0;
  const mins = Math.max(0, Number(timeMinutes) || 0);
  return Math.max(0, Math.round((m * w * mins) / 60));
}

export function toDateInputValue(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getRecentDailyTotals(workouts, foodLogs, days = 7) {
  const today = new Date();
  const labels = [];
  const burned = [];
  const consumed = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = toDateInputValue(d);
    labels.push(key);

    burned.push(
      workouts
        .filter((w) => w.date === key)
        .reduce((acc, w) => acc + (Number(w.caloriesBurned) || 0), 0)
    );

    consumed.push(
      foodLogs
        .filter((f) => f.date === key)
        .reduce((acc, f) => acc + (Number(f.caloriesConsumed) || 0), 0)
    );
  }

  return { labels, burned, consumed };
}

export function calculatePrediction({ currentWeight, goalWeight, avgBurned, avgConsumed }) {
  const dailyDeficit = avgBurned - avgConsumed;
  const dailyWeightLoss = dailyDeficit / KCAL_PER_KG;
  const remainingKg = Math.max(0, currentWeight - goalWeight);

  let daysToGoal = Infinity;
  if (remainingKg <= 0) {
    daysToGoal = 0;
  } else if (dailyWeightLoss > 0) {
    daysToGoal = Math.ceil(remainingKg / dailyWeightLoss);
  }

  return {
    dailyDeficit,
    dailyWeightLoss,
    daysToGoal,
    remainingKg
  };
}

export function calculateDaysForExtraBurn(remainingKg, dailyDeficit, extraBurn) {
  if (remainingKg <= 0) return 0;
  const nextDeficit = dailyDeficit + extraBurn;
  if (nextDeficit <= 0) return Infinity;
  const dailyLoss = nextDeficit / KCAL_PER_KG;
  return Math.ceil(remainingKg / dailyLoss);
}

export function buildPredictedSeries({ startDate, currentWeight, dailyWeightLoss, days = 30 }) {
  const baseDate = new Date(`${startDate}T00:00:00`);
  const points = [];
  let weight = currentWeight;

  for (let i = 1; i <= days; i += 1) {
    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + i);
    weight = Math.max(0, weight - dailyWeightLoss);

    points.push({
      date: toDateInputValue(next),
      weight: Number(weight.toFixed(2))
    });
  }

  return points;
}
