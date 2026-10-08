import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Activity, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';

export const SimulationDashboard: React.FC = () => {
  const { result, config } = useExperiment();

  if (!result) return null;

  // Keep marked states + top states if state count is large
  const allStates = result.simulatedDistribution;
  let chartData = allStates.map((st) => ({
    label: `|${st.binary}⟩`,
    count: st.count,
    probPct: Math.round(st.prob * 1000) / 10,
    isTarget: st.isTarget,
  }));

  if (chartData.length > 8) {
    const marked = chartData.filter((d) => d.isTarget);
    const nonMarked = chartData
      .filter((d) => !d.isTarget)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8 - marked.length);
    chartData = [...marked, ...nonMarked].sort((a, b) => a.label.localeCompare(b.label));
  }

  const empiricalPct = Math.round(result.empiricalSuccessRate * 1000) / 10;
  const theoreticalPct = Math.round(result.theoreticalProb * 1000) / 10;
  const deltaPct = Math.round((empiricalPct - theoreticalPct) * 10) / 10;

  return (
    <div className="quantum-card p-6 space-y-6 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-quantum-simulated" />
          <div>
            <h3 className="font-display font-semibold text-lg text-ink-light dark:text-ink-dark">
              Simulation Results & Shot Distribution
            </h3>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
              Empirical Monte Carlo measurement results across {config.shots.toLocaleString()} simulated shots.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {result.executionTimeMs} ms
          </span>
          <span className="px-2.5 py-1 rounded-full bg-quantum-simulated/10 text-quantum-simulated dark:text-quantum-simulatedLight font-semibold border border-quantum-simulated/20">
            {config.shots.toLocaleString()} Shots
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Empirical Success Rate */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SUCCESS RATE</span>
            <CheckCircle2 className="w-4 h-4 text-quantum-simulated" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-2xl font-extrabold text-quantum-simulated dark:text-quantum-simulatedLight">
              {empiricalPct}%
            </span>
            <span className="text-xs font-mono text-slate-500">
              (Theory: {theoreticalPct}%)
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 pt-1">
            Delta: {deltaPct >= 0 ? `+${deltaPct}` : deltaPct}%
          </p>
        </div>

        {/* Top Measured State */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TOP MEASURED STATE</span>
            <Zap className="w-4 h-4 text-quantum-marked" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-2xl font-extrabold text-quantum-marked dark:text-quantum-markedLight">
              {result.topMeasuredState}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 pt-1">
            Highest candidate
          </p>
        </div>

        {/* State Vector Fidelity */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>STATE FIDELITY</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {(result.fidelityScore * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 pt-1">
            Bhattacharyya state overlap
          </p>
        </div>

      </div>

      {/* Shots Distribution Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span>MEASUREMENT SHOTS PER BASIS STATE</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-quantum-marked rounded-sm inline-block" /> Marked Target
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-quantum-simulated rounded-sm inline-block" /> Unmarked State
            </span>
          </div>
        </div>

        <div className="h-56 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="currentColor" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} label={{ value: 'Shots', angle: -90, position: 'insideLeft', offset: 10, fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl border border-slate-700 shadow-md text-xs font-mono">
                        <p className="font-bold text-white">{data.label}</p>
                        <p className="text-slate-300">Shots: <strong>{data.count}</strong> / {config.shots}</p>
                        <p className="text-slate-300">Ratio: <strong>{data.probPct}%</strong></p>
                        {data.isTarget && <p className="text-amber-400 font-bold">★ Marked Target</p>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTarget ? '#F59E0B' : '#0E8F8F'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
