import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';
import GlassCard from './GlassCard';

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const Sub = styled.p`
  margin: 0.45rem 0 0;
  color: var(--muted-text);
  font-size: 0.85rem;
`;

const Wrap = styled.div`
  height: 320px;
  margin-top: 1rem;
`;

function SmoothChart({ data, goalWeight }) {
  return (
    <GlassCard>
      <Title>Weight Trend</Title>
      <Sub>Curved actual and projected trend with smart goal marker</Sub>
      <Wrap>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 18, right: 18, left: -8, bottom: 4 }}>
            <defs>
              <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
            <XAxis dataKey="date" tick={{ fill: '#B6C0D6', fontSize: 11 }} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#B6C0D6', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(11, 15, 26, 0.95)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 12,
                color: '#e7ecff'
              }}
              labelStyle={{ color: '#9fb0d8' }}
            />
            <ReferenceLine y={goalWeight} stroke="#34D399" strokeDasharray="6 5" />
            <Area type="monotone" dataKey="actual" stroke="none" fill="url(#weightFill)" connectNulls={false} />
            <Line type="monotone" dataKey="actual" stroke="#A78BFA" strokeWidth={3} dot={{ r: 2 }} connectNulls={false} />
            <Line type="monotone" dataKey="predicted" stroke="#22D3EE" strokeWidth={2.5} strokeDasharray="7 5" dot={false} connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Wrap>
    </GlassCard>
  );
}

export default React.memo(SmoothChart);
