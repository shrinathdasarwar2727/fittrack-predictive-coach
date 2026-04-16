import React from 'react';

function WorkoutList({ workouts }) {
  return (
    <section className="glass-card list-card">
      <h3>Recent Workouts</h3>
      {!workouts.length && <p className="muted">No workouts logged yet.</p>}
      <div className="list-stack">
        {workouts.map((w) => (
          <article className="workout-row" key={w.id}>
            <div>
              <p className="row-title">{w.type}</p>
              <p className="muted">{w.date} · {w.durationMin} min</p>
            </div>
            <strong>{w.caloriesBurned} kcal</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(WorkoutList);
