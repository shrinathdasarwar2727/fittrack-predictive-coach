import styled from 'styled-components';
import GlassCard from './GlassCard';

const Value = styled.h3`
  margin: 0.4rem 0;
  font-size: 1.35rem;
  color: #f8fbff;
`;

const Label = styled.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Hint = styled.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.8rem;
`;

function StatCard({ label, value, hint }) {
  return (
    <GlassCard compact>
      <Label>{label}</Label>
      <Value>{value}</Value>
      <Hint>{hint}</Hint>
    </GlassCard>
  );
}

export default StatCard;
