import styled from 'styled-components';
import GlassCard from './GlassCard';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Item = styled.article`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.85rem 0.9rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);

  & + & {
    margin-top: 0.65rem;
  }
`;

const Muted = styled.p`
  margin: 0.25rem 0 0;
  color: var(--muted-text);
  font-size: 0.82rem;
`;

function WorkoutList({ workouts }) {
  return (
    <GlassCard>
      <Header>
        <h3>Workout Feed</h3>
      </Header>
      {!workouts.length ? <Muted>No workouts logged yet.</Muted> : null}
      {workouts.map((w) => (
        <Item key={w.id}>
          <div>
            <strong>{w.type}</strong>
            <Muted>{w.date} · {Math.round(Number(w.durationMin) || 0)} min</Muted>
          </div>
          <strong>{Math.round(Number(w.caloriesBurned) || 0)} kcal</strong>
        </Item>
      ))}
    </GlassCard>
  );
}

export default WorkoutList;
