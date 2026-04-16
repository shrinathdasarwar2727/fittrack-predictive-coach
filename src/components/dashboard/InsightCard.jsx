import styled from 'styled-components';
import GlassCard from './GlassCard';

const List = styled.ul`
  margin: 0.9rem 0 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.55rem;

  li {
    color: var(--muted-text);
    line-height: 1.45;
  }
`;

function InsightCard({ insights }) {
  return (
    <GlassCard>
      <h3>Insights</h3>
      <List>
        {insights.map((item, idx) => (
          <li key={`${item}-${idx}`}>{item}</li>
        ))}
      </List>
    </GlassCard>
  );
}

export default InsightCard;
