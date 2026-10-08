import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { Calculator, Award } from 'lucide-react';
import { MathView } from '../common/MathView';

export const TheoreticalCard: React.FC = () => {
  const { result, config } = useExperiment();

  if (!result) return null;

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark flex items-center gap-1.5">
            Theoretical Baseline <MathView math="\mathcal{O}(\sqrt{N})" />
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-quantum-theoretical/10 text-quantum-theoretical dark:text-quantum-theoreticalLight font-semibold">
          Analytical Solution
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block flex items-center gap-1">
            SEARCH SPACE <MathView math="N = 2^n" />
          </span>
          <span className="font-mono text-xl font-extrabold text-ink-light dark:text-ink-dark">
            {result.totalStates}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
            <MathView math={`2^{${config.numQubits}}`} /> basis states
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block flex items-center gap-1">
            MARKED STATES <MathView math="M" />
          </span>
          <span className="font-mono text-xl font-extrabold text-quantum-marked dark:text-quantum-markedLight">
            {result.markedCount}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
            <MathView math={`M/N = ${(result.markedRatio * 100).toFixed(1)}\\%`} />
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block flex items-center gap-1">
            ROTATION ANGLE <MathView math="\theta" />
          </span>
          <span className="font-mono text-xl font-extrabold text-quantum-theoretical dark:text-quantum-theoreticalLight">
            {result.theta.toFixed(3)}
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
            <MathView math={`\\theta \\approx ${result.thetaDegrees}^\\circ`} />
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block flex items-center gap-1">
            OPTIMAL <MathView math="k_{\text{opt}}" />
          </span>
          <span className="font-mono text-xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            k = {result.optimalIterations}
            <Award className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
            Max <MathView math={`P = ${(result.theoreticalMaxProb * 100).toFixed(1)}\\%`} />
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2.5 border border-slate-800">
        <div className="flex justify-between items-center text-slate-400 text-[11px] border-b border-slate-800 pb-1.5">
          <span>Mathematical Formulation</span>
          <span>Lov Grover (1996)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 items-center">
          <div className="flex items-center gap-1">
            <span>Optimal Iterations:</span>
            <MathView math={`k_{\\text{opt}} \\approx \\left\\lfloor \\frac{\\pi}{4} \\sqrt{\\frac{N}{M}} \\right\\rfloor = ${result.optimalIterations}`} className="text-emerald-400 font-bold" />
          </div>
          <div className="flex items-center gap-1">
            <span>Probability Curve:</span>
            <MathView math={`P(k) = \\sin^2\\left(\\frac{(2k+1)\\theta}{2}\\right) = ${(result.theoreticalProb * 100).toFixed(1)}\\%`} className="text-quantum-theoreticalLight font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
