import styled, { keyframes } from 'styled-components';

const borderOrbit = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CardWrap = styled.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  position: relative;
  border-radius: 1.25rem;
  isolation: isolate;
`;

const Glow = styled.div`
  position: absolute;
  inset: -10px;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  opacity: 0.52;
  filter: blur(20px);
  background: conic-gradient(
    from 0deg,
    rgba(34, 211, 238, 0.62),
    rgba(79, 70, 229, 0.62),
    rgba(168, 85, 247, 0.62),
    rgba(236, 72, 153, 0.62),
    rgba(249, 115, 22, 0.62),
    rgba(34, 211, 238, 0.62)
  );
  animation: ${borderOrbit} 5.5s linear infinite;
`;

const BorderRing = styled.div`
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 1.5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -45%;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(
      from 0deg,
      #22d3ee,
      #4f46e5,
      #a855f7,
      #ec4899,
      #f97316,
      #22d3ee
    );
    animation: ${borderOrbit} 4.2s linear infinite;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  border-radius: calc(1.25rem - 1.5px);
  background: rgba(6, 10, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.15rem;
  backdrop-filter: blur(12px);
  color: #f3f7ff;

  @media (max-width: 640px) {
    padding: 0.95rem;
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.66rem;
`;

const Title = styled.h3`
  margin: 0.45rem 0 0;
  font-size: clamp(1.05rem, 3.2vw, 1.35rem);
`;

const Body = styled.div`
  margin-top: 0.8rem;
`;

function AIFitnessGlowCard({ title = 'AI Fitness Dashboard', subtitle = 'Performance Card', children, className }) {
  return (
    <CardWrap className={className}>
      <Glow />
      <BorderRing>
        <Inner>
          <Eyebrow>{subtitle}</Eyebrow>
          <Title>{title}</Title>
          <Body>{children}</Body>
        </Inner>
      </BorderRing>
    </CardWrap>
  );
}

export default AIFitnessGlowCard;
