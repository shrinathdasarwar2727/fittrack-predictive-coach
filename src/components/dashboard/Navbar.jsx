import styled from 'styled-components';

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

const ThemeToggle = styled.button`
  position: relative;
  width: 164px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(20, 184, 166, 0.45);
  background: ${(props) => (props.isLight ? 'rgba(20, 184, 166, 0.18)' : 'rgba(20, 184, 166, 0.1)')};
  color: var(--tab-text, #eef2ff);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  overflow: hidden;
`;

const ThemeThumb = styled.span`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 72px;
  height: 30px;
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(20, 184, 166, 0.96), rgba(20, 184, 166, 0.82));
  box-shadow: 0 8px 18px rgba(20, 184, 166, 0.24);
  transform: ${(props) => (props.isLight ? 'translateX(84px)' : 'translateX(0)')};
  transition: transform 260ms ease;
`;

const ThemeLabel = styled.span`
  position: relative;
  z-index: 1;
  opacity: ${(props) => (props.active ? 1 : 0.72)};
  transition: opacity 220ms ease;
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
      <ThemeToggle type="button" onClick={onToggleTheme} isLight={isLight} aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
        <ThemeThumb isLight={isLight} />
        <ThemeLabel active={!isLight}>Dark</ThemeLabel>
        <ThemeLabel active={isLight}>Light</ThemeLabel>
      </ThemeToggle>
    </Wrap>
  );
}

export default Navbar;
