import styled from 'styled-components';
import NeonButton from './NeonButton';

const Wrap = styled.nav`
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  align-items: center;
  padding: 0.85rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(16px);
`;

const Tab = styled.button`
  border: 1px solid ${(props) => (props.active ? 'rgba(20, 184, 166, 0.45)' : 'rgba(255, 255, 255, 0.18)')};
  background: ${(props) => (props.active ? 'linear-gradient(120deg, rgba(20, 184, 166, 0.94), rgba(20, 184, 166, 0.82))' : 'rgba(255, 255, 255, 0.06)')};
  color: var(--tab-text, #eef2ff);
  text-transform: capitalize;
  border-radius: 999px;
  padding: 0.52rem 0.95rem;
  white-space: nowrap;
  cursor: pointer;
`;

const Spacer = styled.div`
  margin-left: auto;
`;

function Navbar({ pages, page, onNavigate, isLight, onToggleTheme }) {
  return (
    <Wrap>
      {pages.map((p) => (
        <Tab key={p} active={p === page} onClick={() => onNavigate(p)}>
          {p}
        </Tab>
      ))}
      <Spacer />
      <NeonButton onClick={onToggleTheme}>{isLight ? 'Dark Mode' : 'Light Mode'}</NeonButton>
    </Wrap>
  );
}

export default Navbar;
