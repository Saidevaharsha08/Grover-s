import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { generateBasisStates } from '../../lib/grover-math';
import { Target, CheckCircle2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const TargetStateGrid: React.FC = () => {
  const { config, toggleTargetState, loadPreset } = useExperiment();
  const basisStates = generateBasisStates(config.numQubits, config.targetStates);
  const totalStates = basisStates.length;
  const markedCount = config.targetStates.length;

  return (
    <div className="space-y-4">
      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="font-display font-semibold text-sm text-ink-light dark:text-ink-dark flex items-center gap-2">
          <Target className="w-4 h-4 text-quantum-marked dark:text-quantum-markedLight" />
          <span>Target / Marked Basis States (M)</span>
        </label>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-quantum-marked/15 text-quantum-marked dark:text-quantum-markedLight font-semibold border border-quantum-marked/30">
            M = {markedCount} / {totalStates} Marked
          </span>
          <span className="text-slate-400">({((markedCount / totalStates) * 100).toFixed(1)}%)</span>
        </div>
      </div>

      {/* Grid of Basis States */}
      <div className={`grid gap-2.5 ${config.numQubits === 4 ? 'grid-cols-4 sm:grid-cols-8' : config.numQubits === 3 ? 'grid-cols-4 sm:grid-cols-8' : 'grid-cols-4'}`}>
        {basisStates.map((st) => {
          const isTarget = st.isTarget;

          return (
            <motion.button
              key={st.binary}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTargetState(st.binary)}
              className={`p-3 rounded-xl border text-center font-mono text-xs font-bold transition-all relative flex flex-col items-center justify-center space-y-1 ${
                isTarget
                  ? 'bg-gradient-to-b from-quantum-marked/15 to-quantum-marked/25 border-quantum-marked text-quantum-marked dark:text-quantum-markedLight shadow-xs ring-1 ring-quantum-marked'
                  : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {isTarget && (
                <CheckCircle2 className="w-3.5 h-3.5 absolute top-1 right-1 text-quantum-marked dark:text-quantum-markedLight" />
              )}
              <span className="text-sm">{st.label}</span>
              <span className="text-[10px] font-normal text-slate-400">dec: {st.decimal}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Preset Quick Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-mono flex items-center gap-1">
          <Bookmark className="w-3.5 h-3.5" /> Presets:
        </span>

        {config.numQubits === 2 && (
          <>
            <button
              onClick={() => loadPreset('2q-single')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Single |11⟩
            </button>
            <button
              onClick={() => loadPreset('2q-dual')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Dual |01⟩ & |10⟩
            </button>
          </>
        )}

        {config.numQubits === 3 && (
          <>
            <button
              onClick={() => loadPreset('3q-single')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Single |101⟩
            </button>
            <button
              onClick={() => loadPreset('3q-triple')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Triple |001⟩, |010⟩, |100⟩
            </button>
          </>
        )}

        {config.numQubits === 4 && (
          <>
            <button
              onClick={() => loadPreset('4q-single')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Single |1010⟩
            </button>
            <button
              onClick={() => loadPreset('4q-quad')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors"
            >
              Quad 4-Target
            </button>
          </>
        )}
      </div>
    </div>
  );
};
