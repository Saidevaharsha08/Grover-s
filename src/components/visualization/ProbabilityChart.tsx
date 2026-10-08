import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { TrendingUp, Sparkles } from 'lucide-react';
import { MathView } from '../common/MathView';

export const ProbabilityChart: React.FC = () => {
  const { result, config } = useExperiment();

  if (!result) return null;

  const data = result.probabilityCurve.map((pt) => ({
    k: pt.k,
    probPct: Math.round(pt.prob * 1000) / 10,
    probRaw: pt.prob,
    isOptimal: pt.isOptimal,
    isCurrent: pt.isCurrent,
  }));

  const optimalPoint = data.find((d) => d.isOptimal);

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Success Probability Curve P(k)
          </h3>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-quantum-theoretical dark:text-quantum-theoreticalLight font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-quantum-theoretical" />
            Theoretical P(k)
          </span>
          {optimalPoint && (
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Peak at k = {optimalPoint.k} ({optimalPoint.probPct}%)
            </span>
          )}
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 25, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="currentColor" />
            <XAxis
              dataKey="k"
              label={{ value: 'Grover Iterations (k)', position: 'insideBottom', offset: -5, fill: '#94A3B8', fontSize: 11 }}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
            />
            <YAxis
              domain={[0, 100]}
              unit="%"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              label={{ value: 'Success Probability P(k)', angle: -90, position: 'insideLeft', offset: 15, fill: '#94A3B8', fontSize: 11 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-slate-100 p-3 rounded-xl border border-slate-700 shadow-lg text-xs font-mono space-y-1">
                      <p className="font-bold text-white">Iteration k = {pt.k}</p>
                      <p className="text-quantum-theoreticalLight">
                        Probability P(k): <strong>{pt.probPct}%</strong>
                      </p>
                      {pt.isOptimal && <p className="text-emerald-400 font-bold">★ Theoretical Optimal Iteration</p>}
                      {pt.k === config.iterations && <p className="text-amber-400 font-bold">● Active Experiment Selection</p>}
                    </div>
                  );
                }
                return null;
              }}
            />

            {optimalPoint && (
              <ReferenceLine
                x={optimalPoint.k}
                stroke="#10B981"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{ value: `Optimal k=${optimalPoint.k}`, fill: '#10B981', fontSize: 11, position: 'top' }}
              />
            )}

            <ReferenceLine
              x={config.iterations}
              stroke="#6D5EF5"
              strokeWidth={1.5}
              label={{ value: `Active k=${config.iterations}`, fill: '#6D5EF5', fontSize: 10, position: 'insideTopLeft' }}
            />

            <Line
              type="monotone"
              dataKey="probPct"
              stroke="#6D5EF5"
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.k === config.iterations) {
                  return (
                    <circle key={`dot-${payload.k}`} cx={cx} cy={cy} r={6} fill="#F59E0B" stroke="#FFFFFF" strokeWidth={2} />
                  );
                }
                if (payload.isOptimal) {
                  return (
                    <circle key={`dot-${payload.k}`} cx={cx} cy={cy} r={5} fill="#10B981" stroke="#FFFFFF" strokeWidth={2} />
                  );
                }
                return <circle key={`dot-${payload.k}`} cx={cx} cy={cy} r={3.5} fill="#6D5EF5" />;
              }}
              activeDot={{ r: 7, fill: '#8B7BFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs font-mono text-slate-400 flex flex-wrap justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Formula:</span>
          <MathView math="P(k) = \sin^2\left(\frac{(2k + 1)\theta}{2}\right)" className="text-quantum-theoreticalLight font-semibold" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Angle:</span>
          <MathView math={`\\theta = 2 \\arcsin\\left(\\sqrt{\\frac{M}{N}}\\right) = ${result.theta.toFixed(4)}\\text{ rad}`} className="text-slate-300 font-semibold" />
        </div>
      </div>
    </div>
  );
};
