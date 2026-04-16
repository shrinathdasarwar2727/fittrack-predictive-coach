import React from 'react';

function HeroCard({ currentWeight, goalWeight, completionPct, remainingKg, daysToGoal }) {
  const safePct = Number.isFinite(completionPct) ? Math.min(100, Math.max(0, completionPct)) : 0;
  const safeCurrent = Number.isFinite(currentWeight) ? currentWeight : 0;
  const safeGoal = Number.isFinite(goalWeight) ? goalWeight : 0;
  const safeRemaining = Number.isFinite(remainingKg) ? Math.max(0, remainingKg) : 0;
  const etaText = daysToGoal === 0 ? 'Goal achieved' : Number.isFinite(daysToGoal) ? `${daysToGoal} days` : 'No progress';

  return (
    <section className="glass-card hero-card">
      <div className="hero-top">
        <p className="hero-eyebrow">Goal Progress</p>
        <h1>{safeCurrent.toFixed(1)}kg to {safeGoal.toFixed(1)}kg</h1>
      </div>

      <div className="hero-stats">
        <div>
          <p className="stat-label">Completion</p>
          <p className="stat-value">{safePct.toFixed(0)}%</p>
        </div>
        <div>
          <p className="stat-label">Remaining</p>
          <p className="stat-value">{safeRemaining.toFixed(1)}kg</p>
        </div>
        <div>
          <p className="stat-label">ETA</p>
          <p className="stat-value">{etaText}</p>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${safePct}%` }} />
      </div>
      <p className="hero-sub">Smart estimate based on current calorie balance and weight trend.</p>
    </section>
  );
}

export default React.memo(HeroCard);
