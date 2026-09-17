import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import { BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';

export const AmplitudeEvolution: React.FC = () => {
  const { result } = useExperiment();
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

  if (!result || !result.stepEvolutions || result.stepEvolutions.length === 0) {
    return null;
  }

  const steps = result.stepEvolutions;
  const currentStep = steps[Math.min(selectedStepIdx, steps.length - 1)];

  const chartData = currentStep.amplitudes.map((st) => ({
    label: st.label,
    amplitude: st.amplitude,
    probabilityPct: Math.round(st.probability * 1000) / 10,
    isTarget: st.isTarget,
    phaseDeg: st.phaseDeg,
  }));

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <BarChart2 className="w-4 h-4 text-quantum-theoretical" />
          <div>
            <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
              State Vector Amplitude Evolution Trace
            </h3>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
              Observe phase flip and inversion about mean amplitude μ across each gate operation.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={selectedStepIdx === 0}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            Step {selectedStepIdx + 1} / {steps.length}
          </span>

          <button
            onClick={() => setSelectedStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={selectedStepIdx === steps.length - 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-quantum-theoretical/10 text-quantum-theoretical font-mono text-xs font-bold uppercase">
          {currentStep.stepName}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-ink-light dark:text-ink-dark font-medium">
            {currentStep.description}
          </p>
          <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
            <span>Mean Amplitude μ = <strong>{currentStep.meanAmplitude.toFixed(4)}</strong></span>
            <span>Iteration: <strong>{currentStep.iteration}</strong></span>
          </div>
        </div>
      </div>

      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="currentColor" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94A3B8' }} />
            <YAxis domain={[-1, 1]} tick={{ fontSize: 11, fill: '#94A3B8' }} label={{ value: 'Amplitude (a_i)', angle: -90, position: 'insideLeft', offset: 10, fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl border border-slate-700 shadow-md text-xs font-mono">
                      <p className="font-bold text-white">{data.label}</p>
                      <p className="text-slate-300">Amplitude: <strong>{data.amplitude}</strong></p>
                      <p className="text-slate-300">Probability: <strong>{data.probabilityPct}%</strong></p>
                      <p className="text-slate-300">Phase: <strong>{data.phaseDeg}°</strong></p>
                      {data.isTarget && <p className="text-amber-400 font-bold">★ Marked Target</p>}
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="#64748B" strokeWidth={1} />
            <ReferenceLine
              y={currentStep.meanAmplitude}
              stroke="#F59E0B"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              label={{ value: `μ = ${currentStep.meanAmplitude.toFixed(3)}`, fill: '#F59E0B', fontSize: 10, position: 'top' }}
            />
            <Bar dataKey="amplitude" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isTarget
                      ? entry.amplitude < 0
                        ? '#EF4444'
                        : '#F59E0B'
                      : '#6D5EF5'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
