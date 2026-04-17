import { useEffect, useState } from 'react';
import styled from 'styled-components';

const MOBILE_BREAKPOINT = 1024;

const Wrap = styled.nav`
  position: relative;
  padding: 0.85rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(16px);
`;

const DesktopRow = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  gap: 0.65rem;
  overflow-x: auto;
  align-items: center;
`;

const MobileBar = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Brand = styled.strong`
  color: var(--tab-text, #eef2ff);
  letter-spacing: 0.01em;
  font-size: 0.92rem;
`;

const HamburgerButton = styled.button`
  width: 44px;
  height: 40px;
  border-radius: 10px;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 1.15rem;
  line-height: 1;
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

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.5);
  z-index: 70;
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  transition: opacity 240ms ease;

  @media (min-width: 861px) {
    display: none;
  }
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: min(82vw, 320px);
  height: 100vh;
  padding: 1rem;
  background: var(--glass-bg-strong);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px);
  z-index: 80;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.9rem;
  transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-102%)')};
  transition: transform 280ms ease;

  @media (min-width: 861px) {
    display: none;
  }
`;

const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 36px;
  border-radius: 10px;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 1.05rem;
`;

const DrawerTabs = styled.div`
  display: grid;
  gap: 0.55rem;
  align-content: start;
`;

const DrawerTab = styled(Tab)`
  width: 100%;
  text-align: left;
  border-radius: 12px;
`;

function Navbar({ pages, page, onNavigate, isLight, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  function handleNavigate(nextPage) {
    onNavigate(nextPage);
    setMenuOpen(false);
  }

  return (
    <>
      <Wrap>
        <DesktopRow hidden={isMobile}>
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
        </DesktopRow>

        <MobileBar visible={isMobile}>
          <Brand>FitTrack Menu</Brand>
          <HamburgerButton type="button" aria-label="Open navigation menu" onClick={() => setMenuOpen(true)}>
            ☰
          </HamburgerButton>
        </MobileBar>
      </Wrap>

      <DrawerOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <Drawer open={menuOpen}>
        <DrawerHead>
          <Brand>Navigation</Brand>
          <CloseButton type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
            ×
          </CloseButton>
        </DrawerHead>

        <DrawerTabs>
          {pages.map((p) => (
            <DrawerTab key={p} active={p === page} onClick={() => handleNavigate(p)}>
              {p}
            </DrawerTab>
          ))}
        </DrawerTabs>

        <ThemeToggle type="button" onClick={onToggleTheme} isLight={isLight} aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
          <ThemeThumb isLight={isLight} />
          <ThemeLabel active={!isLight}>Dark</ThemeLabel>
          <ThemeLabel active={isLight}>Light</ThemeLabel>
        </ThemeToggle>
      </Drawer>
    </>
  );
}

export default Navbar;
