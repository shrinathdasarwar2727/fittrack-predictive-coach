import { motion } from 'framer-motion';
import { useId } from 'react';
import styled from 'styled-components';

const RingWrap = styled.div`
  width: 132px;
  height: 132px;
  display: grid;
  place-items: center;
  position: relative;
`;

const CenterLabel = styled.div`
  position: absolute;
  text-align: center;

  strong {
    font-size: 1.45rem;
    display: block;
  }

  span {
    color: var(--muted-text);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

function ProgressRing({ value }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = 52;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (safeValue / 100) * circumference;
  const gradientId = useId();

  return (
    <RingWrap>
      <svg width={radius * 2} height={radius * 2}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="52%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <circle
          stroke="rgba(255,255,255,0.16)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <CenterLabel>
        <strong>{safeValue.toFixed(0)}%</strong>
        <span>On Track</span>
      </CenterLabel>
    </RingWrap>
  );
}

export default ProgressRing;
