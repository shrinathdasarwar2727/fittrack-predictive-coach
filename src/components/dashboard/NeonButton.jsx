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
  background: linear-gradient(125deg, #14b8a6, #14b8a6);
  box-shadow: 0 10px 24px rgba(20, 184, 166, 0.34), 0 0 20px rgba(20, 184, 166, 0.22);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16px 36px rgba(20, 184, 166, 0.44), 0 0 28px rgba(20, 184, 166, 0.3);
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
      animate={{ boxShadow: ['0 10px 24px rgba(20, 184, 166, 0.34), 0 0 20px rgba(20, 184, 166, 0.22)', '0 14px 30px rgba(20, 184, 166, 0.44), 0 0 26px rgba(20, 184, 166, 0.3)', '0 10px 24px rgba(20, 184, 166, 0.34), 0 0 20px rgba(20, 184, 166, 0.22)'] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default NeonButton;
