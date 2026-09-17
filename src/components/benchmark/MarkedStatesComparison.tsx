import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Layers } from 'lucide-react';

export const MarkedStatesComparison: React.FC = () => {
  const data4Q = [
    { m: 1, kOpt: 3, ratioPct: 6.25, thetaDeg: 28.9, maxP: 96.1 },
    { m: 2, kOpt: 2, ratioPct: 12.5, thetaDeg: 41.4, maxP: 94.5 },
    { m: 4, kOpt: 1, ratioPct: 25.0, thetaDeg: 60.0, maxP: 100.0 },
    { m: 8, kOpt: 1, ratioPct: 50.0, thetaDeg: 90.0, maxP: 100.0 },
  ];

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-quantum-marked" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Effect of Marked State Count (M) on Optimal Iterations
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Scaling Law: k_opt ∝ √(N/M)
        </span>
      </div>

      <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono leading-relaxed">
        As the number of marked target states M increases, the rotation angle θ per iteration expands, reducing the required Grover iterations k_opt to reach peak probability.
      </p>

      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data4Q} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="currentColor" />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#94A3B8' }} label={{ value: 'Marked Target States (M) [N=16]', position: 'insideBottom', offset: -5, fill: '#94A3B8', fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} domain={[0, 4]} label={{ value: 'Optimal k_opt', angle: -90, position: 'insideLeft', offset: 10, fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl border border-slate-700 shadow-md text-xs font-mono">
                      <p className="font-bold text-white">Marked States M = {d.m}</p>
                      <p className="text-emerald-400">Optimal Iterations: <strong>k_opt = {d.kOpt}</strong></p>
                      <p className="text-slate-300">Rotation Angle θ: <strong>{d.thetaDeg}°</strong></p>
                      <p className="text-slate-300">Max Probability: <strong>{d.maxP}%</strong></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="kOpt" radius={[4, 4, 0, 0]}>
              {data4Q.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#6D5EF5' : '#D97706'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
