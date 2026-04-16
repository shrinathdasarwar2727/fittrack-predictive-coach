import React from 'react';

function StatsGrid({ stats }) {
  return (
    <section className="stats-grid">
      {stats.map((item) => (
        <article key={item.label} className="glass-card stat-tile">
          <p className="stat-label">{item.label}</p>
          <h3>{item.value}</h3>
          <p className="muted">{item.hint}</p>
        </article>
      ))}
    </section>
  );
}

export default React.memo(StatsGrid);
