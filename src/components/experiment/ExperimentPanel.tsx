import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { QubitSelector } from './QubitSelector';
import { TargetStateGrid } from './TargetStateGrid';
import { IterationControl } from './IterationControl';
import { Settings, Play, BookmarkPlus } from 'lucide-react';

export const ExperimentPanel: React.FC = () => {
  const { runExperiment, isRunning, saveCurrentExperiment } = useExperiment();

  return (
    <section id="experiment" className="quantum-card p-6 sm:p-8 space-y-8 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-quantum-theoretical" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-ink-light dark:text-ink-dark">
              Configure Your Experiment
            </h2>
          </div>
          <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark mt-1">
            Adjust qubit count (n), toggle target states (M), and calibrate Grover iterations (k).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => saveCurrentExperiment()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Save current experiment to localStorage history"
          >
            <BookmarkPlus className="w-4 h-4 text-quantum-theoretical" />
            <span>Save Experiment</span>
          </button>

          <button
            onClick={runExperiment}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-quantum-theoretical hover:bg-quantum-theoreticalLight shadow-sm transition-all disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Simulating...' : 'Simulate'}</span>
          </button>
        </div>
      </div>

      {/* Grid Layout of Controls */}
      <div className="space-y-8">
        <QubitSelector />
        <TargetStateGrid />
        <IterationControl />
      </div>

    </section>
  );
};
