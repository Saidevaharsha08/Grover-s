import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { generateBasisStates } from '../../lib/grover-math';
import { Eye, Table, Grid } from 'lucide-react';

export const OraclePanel: React.FC = () => {
  const { config } = useExperiment();
  const [viewMode, setViewMode] = useState<'matrix' | 'truthtable'>('matrix');
  const basisStates = generateBasisStates(config.numQubits, config.targetStates);

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Oracle Operator Matrix (U_ω)
          </h3>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('matrix')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              viewMode === 'matrix'
                ? 'bg-white dark:bg-surface-dark text-quantum-theoretical font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Matrix Diagonal</span>
          </button>
          <button
            onClick={() => setViewMode('truthtable')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              viewMode === 'truthtable'
                ? 'bg-white dark:bg-surface-dark text-quantum-theoretical font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Truth Table</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
        U_ω |x⟩ = (-1)^f(x) |x⟩ where f(x)=1 for target state(s) and 0 otherwise.
      </p>

      {viewMode === 'matrix' && (
        <div className="overflow-x-auto pt-2">
          <div className="font-mono text-xs inline-block min-w-full">
            <div className="flex items-center mb-1 text-[10px] text-slate-400">
              <span className="w-16">State</span>
              <span className="flex-1 text-center">U_ω Matrix Diagonal Elements (2ⁿ × 2ⁿ)</span>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800">
              {basisStates.map((st) => {
                const value = st.isTarget ? -1 : 1;
                return (
                  <div
                    key={st.binary}
                    className={`p-2 rounded border text-center transition-all ${
                      st.isTarget
                        ? 'bg-quantum-marked/20 border-quantum-marked text-quantum-markedLight font-bold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400">{st.label}</div>
                    <div className="text-sm font-bold mt-0.5">{value > 0 ? '+1' : '-1'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'truthtable' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2 px-3">Input State |x⟩</th>
                <th className="py-2 px-3">Decimal</th>
                <th className="py-2 px-3">Oracle Output f(x)</th>
                <th className="py-2 px-3">Phase Shift (-1)^f(x)</th>
                <th className="py-2 px-3">Target Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {basisStates.map((st) => (
                <tr
                  key={st.binary}
                  className={st.isTarget ? 'bg-quantum-marked/10 font-bold text-quantum-marked dark:text-quantum-markedLight' : ''}
                >
                  <td className="py-2 px-3">{st.label}</td>
                  <td className="py-2 px-3">{st.decimal}</td>
                  <td className="py-2 px-3">{st.isTarget ? '1' : '0'}</td>
                  <td className="py-2 px-3 font-semibold">{st.isTarget ? '-1 (Phase Inverted)' : '+1 (Unchanged)'}</td>
                  <td className="py-2 px-3">
                    {st.isTarget ? (
                      <span className="px-2 py-0.5 rounded bg-quantum-marked/20 text-quantum-marked font-semibold text-[10px]">
                        MARKED TARGET
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Unmarked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
