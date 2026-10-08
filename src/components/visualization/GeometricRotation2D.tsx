import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { Compass } from 'lucide-react';
import { MathView } from '../common/MathView';

export const GeometricRotation2D: React.FC = () => {
  const { result, config } = useExperiment();

  if (!result) return null;

  const { theta } = result;
  const k = config.iterations;

  const alpha0 = theta / 2;
  const alphaK = ((2 * k + 1) * theta) / 2;

  const center = 150;
  const radius = 110;

  const getCoords = (angleRad: number) => {
    const x = center + radius * Math.cos(angleRad);
    const y = center - radius * Math.sin(angleRad);
    return { x, y };
  };

  const initCoords = getCoords(alpha0);
  const currentCoords = getCoords(alphaK);

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            2D Geometric Subspace State Rotation
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <span>Subspace:</span>
          <MathView math="\text{Span}(|w^\perp\rangle, |w\rangle)" />
        </div>
      </div>

      <div className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono flex items-center gap-1.5 flex-wrap">
        <span>Grover operator rotates state vector</span>
        <MathView math="|s_k\rangle" className="text-quantum-theoreticalLight font-bold" />
        <span>counterclockwise towards target subspace</span>
        <MathView math="|w\rangle" className="text-quantum-markedLight font-bold" />
        <span>by step angle</span>
        <MathView math={`\\theta = ${(theta * 180 / Math.PI).toFixed(1)}^\\circ`} className="text-slate-300 font-bold" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
        <div className="relative">
          <svg width={300} height={200} className="font-mono text-xs select-none">
            <line
              x1={center - 20}
              y1={center}
              x2={center + radius + 30}
              y2={center}
              className="stroke-slate-400 dark:stroke-slate-600 stroke-1.5"
            />
            <text x={center + radius + 5} y={center + 18} className="fill-slate-500 font-bold text-xs">
              |w^⊥⟩ (Unmarked)
            </text>

            <line
              x1={center}
              y1={center + 20}
              x2={center}
              y2={center - radius - 25}
              className="stroke-quantum-marked dark:stroke-quantum-markedLight stroke-2"
            />
            <text x={center + 8} y={center - radius - 15} className="fill-quantum-marked dark:fill-quantum-markedLight font-bold text-xs">
              |w⟩ (Target Subspace)
            </text>

            <path
              d={`M ${center + radius} ${center} A ${radius} ${radius} 0 0 0 ${center} ${center - radius}`}
              className="stroke-slate-300 dark:stroke-slate-700 stroke-1 fill-none stroke-dasharray-2"
              strokeDasharray="4 4"
            />

            <line
              x1={center}
              y1={center}
              x2={initCoords.x}
              y2={initCoords.y}
              className="stroke-slate-400 stroke-1.5 stroke-dasharray-1"
              strokeDasharray="3 3"
            />
            <circle cx={initCoords.x} cy={initCoords.y} r={3} className="fill-slate-400" />
            <text x={initCoords.x + 6} y={initCoords.y + 4} className="fill-slate-400 text-[10px]">
              |s_0⟩ (Init)
            </text>

            <line
              x1={center}
              y1={center}
              x2={currentCoords.x}
              y2={currentCoords.y}
              className="stroke-quantum-theoretical stroke-3"
            />
            <circle cx={currentCoords.x} cy={currentCoords.y} r={5} className="fill-quantum-theoretical" />
            <text
              x={currentCoords.x + 8}
              y={currentCoords.y - 6}
              className="fill-quantum-theoretical dark:fill-quantum-theoreticalLight font-bold text-xs"
            >
              |s_k⟩ (k={k})
            </text>

            <path
              d={`M ${initCoords.x} ${initCoords.y} A ${radius} ${radius} 0 0 0 ${currentCoords.x} ${currentCoords.y}`}
              className="stroke-amber-400 stroke-2 fill-none"
            />
          </svg>
        </div>

        <div className="space-y-3 font-mono text-xs w-full sm:w-64 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-400 flex items-center gap-1">
              Angle <MathView math="\phi_k" />:
            </span>
            <span className="font-bold text-ink-light dark:text-ink-dark">
              <MathView math={`${alphaK.toFixed(3)}\\text{ rad}`} />
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-400">Unmarked Proj:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              <MathView math={`\\cos(${ (alphaK * 180 / Math.PI).toFixed(0) }^\\circ) = ${Math.cos(alphaK).toFixed(3)}`} />
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-slate-400">Target Proj:</span>
            <span className="font-bold text-quantum-marked dark:text-quantum-markedLight">
              <MathView math={`\\sin(${ (alphaK * 180 / Math.PI).toFixed(0) }^\\circ) = ${Math.sin(alphaK).toFixed(3)}`} />
            </span>
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-400">Success Rate:</span>
            <span className="font-bold text-quantum-simulated dark:text-quantum-simulatedLight text-sm">
              <MathView math={`${(result.theoreticalProb * 100).toFixed(1)}\\%`} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
