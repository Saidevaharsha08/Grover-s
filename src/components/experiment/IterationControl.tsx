import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { calculateOptimalIterations } from '../../lib/grover-math';
import { Zap, Sparkles, Sliders, Activity } from 'lucide-react';

export const IterationControl: React.FC = () => {
  const { config, setIterations, setShots, setNoiseLevel, setAutoOptimalIterations } = useExperiment();
  const totalStates = Math.pow(2, config.numQubits);
  const markedCount = config.targetStates.length;
  const optimalK = calculateOptimalIterations(markedCount, totalStates);
  const maxSliderK = Math.max(10, optimalK + 4);

  const isOptimal = config.iterations === optimalK;

  return (
    <div className="space-y-6 pt-2">
      
      {/* 1. Grover Iterations Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-display font-semibold text-sm text-ink-light dark:text-ink-dark flex items-center gap-2">
            <Zap className="w-4 h-4 text-quantum-theoretical" />
            <span>Grover Iterations (k)</span>
          </label>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-sm font-bold text-ink-light dark:text-ink-dark px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              k = {config.iterations}
            </span>

            {!isOptimal && (
              <button
                onClick={setAutoOptimalIterations}
                className="inline-flex items-center gap-1 text-xs font-mono text-quantum-theoretical dark:text-quantum-theoreticalLight hover:underline font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto Optimal (k={optimalK})</span>
              </button>
            )}

            {isOptimal && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                Optimal Peak (k={optimalK})
              </span>
            )}
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={maxSliderK}
            step={1}
            value={config.iterations}
            onChange={(e) => setIterations(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-quantum-theoretical"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>k = 0 (Init)</span>
            <span className="text-quantum-theoretical font-bold">Optimal k = {optimalK}</span>
            <span>k = {maxSliderK} (Over-rotation)</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Execution Parameters: Shots & Noise Simulation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        
        {/* Shots Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Monte Carlo Shots</span>
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {config.shots.toLocaleString()}
            </span>
          </div>
          <select
            value={config.shots}
            onChange={(e) => setShots(parseInt(e.target.value, 10))}
            className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value={100}>100 Shots (Fast draft)</option>
            <option value={1000}>1,000 Shots (Standard)</option>
            <option value={5000}>5,000 Shots (High precision)</option>
            <option value={10000}>10,000 Shots (Publication grade)</option>
          </select>
        </div>

        {/* Noise Simulation Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Depolarizing Quantum Noise</span>
            </span>
            <span className="font-mono font-bold text-quantum-theoretical">
              {(config.noiseLevel * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={0.15}
            step={0.01}
            value={config.noiseLevel}
            onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-quantum-simulated"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>0% (Ideal)</span>
            <span>15% Noise</span>
          </div>
        </div>

      </div>

    </div>
  );
};
