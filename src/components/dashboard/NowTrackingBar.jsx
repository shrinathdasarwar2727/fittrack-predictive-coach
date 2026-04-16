import { motion } from 'framer-motion';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  position: sticky;
  bottom: 0.9rem;
  z-index: 4;
  margin-top: 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(120deg, rgba(79, 70, 229, 0.5), rgba(34, 211, 238, 0.32));
  padding: 0.65rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(16px);
`;

const Muted = styled.span`
  color: rgba(239, 244, 255, 0.86);
  font-size: 0.84rem;
`;

function NowTrackingBar({ calories, trend }) {
  return (
    <Bar initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
      <strong>Now Tracking</strong>
      <Muted>{Math.round(Number(calories) || 0)} kcal net · {trend}</Muted>
    </Bar>
  );
}

export default NowTrackingBar;
