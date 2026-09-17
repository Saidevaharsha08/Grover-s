import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { Calculator, Award } from 'lucide-react';

export const TheoreticalCard: React.FC = () => {
  const { result, config } = useExperiment();

  if (!result) return null;

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Theoretical Quantum Mechanics Baseline
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-quantum-theoretical/10 text-quantum-theoretical dark:text-quantum-theoreticalLight font-semibold">
          Analytical Solved
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">SEARCH SPACE (N)</span>
          <span className="font-mono text-xl font-extrabold text-ink-light dark:text-ink-dark">
            {result.totalStates}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">2^{config.numQubits} basis states</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">MARKED STATES (M)</span>
          <span className="font-mono text-xl font-extrabold text-quantum-marked dark:text-quantum-markedLight">
            {result.markedCount}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">M/N = {(result.markedRatio * 100).toFixed(1)}%</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">ROTATION ANGLE (θ)</span>
          <span className="font-mono text-xl font-extrabold text-quantum-theoretical dark:text-quantum-theoreticalLight">
            {result.theta.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{result.thetaDegrees}° / iteration</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">OPTIMAL ITERATIONS (k_opt)</span>
          <span className="font-mono text-xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            k = {result.optimalIterations}
            <Award className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Max P: {(result.theoreticalMaxProb * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
        <div className="flex justify-between items-center text-slate-400 text-[11px] border-b border-slate-800 pb-1.5">
          <span>Theoretical Formulation</span>
          <span>Lov Grover (1996)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
          <div>Optimal Iterations: <strong className="text-emerald-400">k_opt ≈ ⌊(π/4) √(N/M)⌋ = {result.optimalIterations}</strong></div>
          <div>Active Probability: <strong className="text-quantum-theoreticalLight">P(k={config.iterations}) = {(result.theoreticalProb * 100).toFixed(2)}%</strong></div>
        </div>
      </div>
    </div>
  );
};
