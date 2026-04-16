import React from 'react';

function InsightsPanel({ insights }) {
  return (
    <section className="glass-card insights-card">
      <h3>Smart Insights</h3>
      <ul>
        {insights.map((item, idx) => (
          <li key={`${item}-${idx}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default React.memo(InsightsPanel);
