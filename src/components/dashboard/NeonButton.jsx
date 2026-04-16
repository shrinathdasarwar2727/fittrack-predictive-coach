import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledButton = styled(motion.button)`
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.2rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: #f8fbff;
  cursor: pointer;
  background: linear-gradient(125deg, #4f46e5, #22d3ee, #34d399);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16px 36px rgba(79, 70, 229, 0.52), 0 0 28px rgba(34, 211, 238, 0.36);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function NeonButton({ children, type = 'button', ...props }) {
  return (
    <StyledButton
      type={type}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      animate={{ boxShadow: ['0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)', '0 14px 30px rgba(79, 70, 229, 0.52), 0 0 26px rgba(52, 211, 153, 0.35)', '0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)'] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default NeonButton;
