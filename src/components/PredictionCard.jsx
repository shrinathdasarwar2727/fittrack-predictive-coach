import React from 'react';

function formatDays(days) {
  if (days === 0) return 'Goal achieved';
  if (!Number.isFinite(days)) return 'No progress';
  if (days < 0) return 'Goal achieved';
  return `${days} days`;
}

function PredictionCard({ dailyDeficit, baseDays, plus200Days, plus400Days }) {
  return (
    <section className="glass-card prediction-card">
      <h3>Weight Loss Prediction</h3>
      <p className="muted">7700 kcal = 1kg fat loss model</p>

      <div className="prediction-grid">
        <div className="prediction-item">
          <span>Current pace</span>
          <strong>{formatDays(baseDays)}</strong>
        </div>
        <div className="prediction-item">
          <span>+200 kcal burn/day</span>
          <strong>{formatDays(plus200Days)}</strong>
        </div>
        <div className="prediction-item">
          <span>+400 kcal burn/day</span>
          <strong>{formatDays(plus400Days)}</strong>
        </div>
      </div>

      <div className={`deficit-badge ${dailyDeficit >= 0 ? 'good' : 'warn'}`}>
        {dailyDeficit >= 0
          ? `Calorie deficit: ${Math.round(dailyDeficit)} kcal/day`
          : `Calorie surplus: ${Math.abs(Math.round(dailyDeficit))} kcal/day`}
      </div>
    </section>
  );
}

export default React.memo(PredictionCard);
