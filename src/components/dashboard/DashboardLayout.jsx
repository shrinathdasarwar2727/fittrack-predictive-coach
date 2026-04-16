import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalDashboardTheme = createGlobalStyle`
  .app-shell[data-theme='dark'] {
    --page-bg: #0b0f1a;
    --page-bg-alt: #111a2b;
    --glass-bg: rgba(16, 24, 40, 0.58);
    --glass-bg-strong: rgba(16, 24, 40, 0.74);
    --muted-text: #9aa8c4;
    color: #f5f8ff;
  }

  .app-shell[data-theme='light'] {
    --page-bg: #e7edf8;
    --page-bg-alt: #dbe7fb;
    --glass-bg: rgba(255, 255, 255, 0.58);
    --glass-bg-strong: rgba(255, 255, 255, 0.74);
    --muted-text: #4f5f82;
    color: #162036;
  }
`;

const LayoutShell = styled(motion.div)`
  position: relative;
  border-radius: 1.2rem;
  padding: 1.25rem;
  background:
    radial-gradient(900px 520px at 100% 0%, rgba(34, 211, 238, 0.14), transparent 62%),
    radial-gradient(760px 500px at 0% 100%, rgba(79, 70, 229, 0.14), transparent 60%),
    linear-gradient(165deg, var(--page-bg), var(--page-bg-alt));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
`;

const Header = styled.header`
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;

  p {
    margin: 0;
    color: var(--muted-text);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.72rem;
  }

  h2 {
    margin: 0.4rem 0 0;
    font-size: clamp(1.15rem, 2.7vw, 2rem);
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const contentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

function DashboardLayout({ children, title, subtitle, theme }) {
  return (
    <>
      <GlobalDashboardTheme />
      <LayoutShell initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} data-theme={theme}>
        <Header>
          <p>{subtitle}</p>
          <h2>{title}</h2>
        </Header>
        <Content variants={contentVariants} initial="hidden" animate="show">
          {children}
        </Content>
      </LayoutShell>
    </>
  );
}

export default DashboardLayout;
