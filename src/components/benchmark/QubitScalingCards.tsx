import React from 'react';
import { Cpu, TrendingUp } from 'lucide-react';

export const QubitScalingCards: React.FC = () => {
  const scalingData = [
    { qubits: 2, states: 4, classicalQueries: 2, quantumQueries: 1, speedup: '2.0x' },
    { qubits: 3, states: 8, classicalQueries: 4, quantumQueries: 2, speedup: '2.0x' },
    { qubits: 4, states: 16, classicalQueries: 8, quantumQueries: 3, speedup: '2.7x' },
    { qubits: 6, states: 64, classicalQueries: 32, quantumQueries: 6, speedup: '5.3x' },
    { qubits: 8, states: 256, classicalQueries: 128, quantumQueries: 12, speedup: '10.7x' },
    { qubits: 10, states: 1024, classicalQueries: 512, quantumQueries: 25, speedup: '20.5x' },
    { qubits: 16, states: 65536, classicalQueries: 32768, quantumQueries: 201, speedup: '163.0x' },
    { qubits: 20, states: 1048576, classicalQueries: 524288, quantumQueries: 804, speedup: '652.1x' },
  ];

  return (
    <div className="quantum-card p-6 space-y-6 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Quantum Quadratic Speedup Scaling (N = 2ⁿ)
          </h3>
        </div>
        <span className="text-xs font-mono text-quantum-simulated font-bold">
          Asymptotics: O(N) Classical vs O(√N) Quantum
        </span>
      </div>

      <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
        As qubit count n increases, the search space N grows exponentially (2ⁿ), but Grover query requirements scale only square-root polynomial (√N), providing massive speedup for large datasets.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scalingData.map((item) => (
          <div
            key={item.qubits}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-quantum-theoretical transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-ink-light dark:text-ink-dark flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-quantum-theoretical" />
                {item.qubits} Qubits
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-quantum-simulated/15 text-quantum-simulated dark:text-quantum-simulatedLight font-bold">
                {item.speedup}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Search Space N:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{item.states.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Classical Avg:</span>
                <span className="text-slate-600 dark:text-slate-400">{item.classicalQueries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Grover k_opt:</span>
                <span className="font-bold text-quantum-theoreticalLight">{item.quantumQueries.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
