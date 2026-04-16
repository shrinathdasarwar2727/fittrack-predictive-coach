import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

function WeightChart({ data, goalWeight }) {
  return (
    <section className="glass-card chart-card">
      <h3>Weight Trend and Prediction</h3>
      <p className="muted">Solid = actual, dashed = predicted next 30 days</p>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 10 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#c6c6d8', fontSize: 11 }} tickMargin={8} />
            <YAxis tick={{ fill: '#c6c6d8', fontSize: 11 }} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17,17,24,0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                color: '#f2f2ff'
              }}
            />
            <Legend />
            <ReferenceLine
              y={goalWeight}
              stroke="#5eeaa3"
              strokeDasharray="6 6"
              label={{ value: `Goal ${goalWeight}kg`, position: 'insideTopRight', fill: '#5eeaa3' }}
            />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#7c6af7" strokeWidth={3} dot={{ r: 3 }} connectNulls={false} />
            <Line
              type="monotone"
              dataKey="predicted"
              name="Predicted"
              stroke="#38d9f5"
              strokeWidth={2.5}
              strokeDasharray="7 5"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default React.memo(WeightChart);
