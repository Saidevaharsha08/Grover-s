import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import type { QubitCount } from '../../lib/types';
import { Cpu } from 'lucide-react';

export const QubitSelector: React.FC = () => {
  const { config, setNumQubits } = useExperiment();

  const options: Array<{ qubits: QubitCount; states: number; desc: string }> = [
    { qubits: 2, states: 4, desc: '4 Basis States (|00⟩ … |11⟩)' },
    { qubits: 3, states: 8, desc: '8 Basis States (|000⟩ … |111⟩)' },
    { qubits: 4, states: 16, desc: '16 Basis States (|0000⟩ … |1111⟩)' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-display font-semibold text-sm text-ink-light dark:text-ink-dark flex items-center gap-2">
          <Cpu className="w-4 h-4 text-quantum-theoretical" />
          <span>Number of Qubits (n)</span>
        </label>
        <span className="text-xs font-mono text-slate-400">
          N = 2ⁿ = <strong className="text-quantum-theoretical dark:text-quantum-theoreticalLight">{Math.pow(2, config.numQubits)} states</strong>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = config.numQubits === opt.qubits;
          return (
            <button
              key={opt.qubits}
              onClick={() => setNumQubits(opt.qubits)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-quantum-theoretical/10 border-quantum-theoretical text-quantum-theoretical dark:text-quantum-theoreticalLight font-semibold shadow-xs ring-1 ring-quantum-theoretical'
                  : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold">{opt.qubits} Qubits</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  N={opt.states}
                </span>
              </div>
              <p className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark mt-1 font-mono">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
