import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { Layers } from 'lucide-react';

export const CircuitDiagram: React.FC = () => {
  const { config } = useExperiment();
  const { numQubits, iterations, targetStates } = config;

  const wireHeight = 44;
  const startX = 70;
  const initHWidth = 40;
  const loopWidth = 140;
  const measureWidth = 50;

  const totalWidth = startX + initHWidth + (iterations > 0 ? iterations * loopWidth : loopWidth) + measureWidth + 60;
  const totalHeight = numQubits * wireHeight + 40;

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Dynamic Quantum Circuit Diagram
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span>{numQubits} Qubits</span>
          <span>•</span>
          <span>{iterations} Grover Iteration{iterations !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
        <div>
          Target State(s):{' '}
          <strong className="text-quantum-marked dark:text-quantum-markedLight">
            {targetStates.map((s) => '|' + s + '⟩').join(', ')}
          </strong>
        </div>
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block" /> H (Hadamard)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" /> U_ω (Oracle)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-teal-500 rounded-sm inline-block" /> U_s (Diffuser)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto py-2">
        <svg
          width={Math.max(600, totalWidth)}
          height={totalHeight}
          className="mx-auto font-mono text-xs select-none"
        >
          {Array.from({ length: numQubits }).map((_, q) => {
            const y = 30 + q * wireHeight;
            return (
              <g key={`wire-${q}`}>
                <text
                  x={15}
                  y={y + 4}
                  className="fill-slate-700 dark:fill-slate-200 font-bold text-xs"
                >
                  q_{q}: |0⟩
                </text>

                <line
                  x1={startX}
                  y1={y}
                  x2={totalWidth - 30}
                  y2={y}
                  className="stroke-slate-300 dark:stroke-slate-700 stroke-2"
                />
              </g>
            );
          })}

          {Array.from({ length: numQubits }).map((_, q) => {
            const y = 30 + q * wireHeight;
            const x = startX + 15;
            return (
              <g key={`h-gate-${q}`}>
                <rect
                  x={x}
                  y={y - 14}
                  width={28}
                  height={28}
                  rx={6}
                  className="fill-purple-600 dark:fill-purple-700 stroke-purple-400 stroke-1 shadow-xs"
                />
                <text
                  x={x + 14}
                  y={y + 4}
                  textAnchor="middle"
                  className="fill-white font-bold text-xs"
                >
                  H
                </text>
              </g>
            );
          })}

          <line
            x1={startX + initHWidth + 15}
            y1={15}
            x2={startX + initHWidth + 15}
            y2={totalHeight - 15}
            className="stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            strokeDasharray="4 4"
          />

          {iterations > 0 ? (
            Array.from({ length: iterations }).map((_, iterIdx) => {
              const blockX = startX + initHWidth + 30 + iterIdx * loopWidth;
              const boxHeight = numQubits * wireHeight - 10;
              const topY = 15;

              return (
                <g key={`iter-block-${iterIdx}`}>
                  <rect
                    x={blockX}
                    y={topY}
                    width={48}
                    height={boxHeight}
                    rx={8}
                    className="fill-amber-500/20 dark:fill-amber-500/30 stroke-amber-500 stroke-2"
                  />
                  <text
                    x={blockX + 24}
                    y={topY + boxHeight / 2 + 4}
                    textAnchor="middle"
                    className="fill-amber-600 dark:fill-amber-300 font-bold text-xs"
                  >
                    U_ω
                  </text>

                  <rect
                    x={blockX + 60}
                    y={topY}
                    width={48}
                    height={boxHeight}
                    rx={8}
                    className="fill-teal-500/20 dark:fill-teal-500/30 stroke-teal-500 stroke-2"
                  />
                  <text
                    x={blockX + 84}
                    y={topY + boxHeight / 2 + 4}
                    textAnchor="middle"
                    className="fill-teal-600 dark:fill-teal-300 font-bold text-xs"
                  >
                    U_s
                  </text>

                  <text
                    x={blockX + 54}
                    y={totalHeight - 5}
                    textAnchor="middle"
                    className="fill-slate-400 font-mono text-[10px]"
                  >
                    Iter #{iterIdx + 1}
                  </text>
                </g>
              );
            })
          ) : (
            <text
              x={startX + initHWidth + 80}
              y={totalHeight / 2}
              className="fill-slate-400 font-mono text-xs"
            >
              (k = 0: No Grover iterations applied)
            </text>
          )}

          {Array.from({ length: numQubits }).map((_, q) => {
            const y = 30 + q * wireHeight;
            const measureX = totalWidth - 45;
            return (
              <g key={`measure-${q}`}>
                <rect
                  x={measureX}
                  y={y - 14}
                  width={28}
                  height={28}
                  rx={6}
                  className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 stroke-1"
                />
                <path
                  d={`M ${measureX + 6} ${y + 6} A 8 8 0 0 1 ${measureX + 22} ${y + 6}`}
                  className="stroke-slate-300 fill-none stroke-1.5"
                />
                <line
                  x1={measureX + 14}
                  y1={y + 6}
                  x2={measureX + 20}
                  y2={y - 4}
                  className="stroke-amber-400 stroke-1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
