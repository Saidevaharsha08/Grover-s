import React from 'react';
import { Cpu, ExternalLink, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-quantum-theoretical to-quantum-simulated flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
                Grover<span className="text-quantum-theoretical dark:text-quantum-theoreticalLight">Lab</span>
              </span>
            </div>
            <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed max-w-md">
              An interactive quantum algorithm laboratory designed for simulating, analyzing, and benchmarking Grover's Unstructured Search Algorithm across 2, 3, and 4 qubit systems.
            </p>
            <div className="flex items-center space-x-4 pt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Qiskit 1.x Compatible
              </span>
              <span>•</span>
              <span>Frontend Simulation Layer</span>
            </div>
          </div>

          {/* Col 2: Quantum Algorithm Summary */}
          <div>
            <h4 className="font-display font-semibold text-xs text-ink-light dark:text-ink-dark uppercase tracking-wider mb-3">
              Algorithm Invariants
            </h4>
            <ul className="space-y-2 text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
              <li>Search Space: <span className="text-slate-900 dark:text-white font-semibold">N = 2ⁿ</span></li>
              <li>Rotation Angle: <span className="text-slate-900 dark:text-white font-semibold">θ = 2 arcsin(√(M/N))</span></li>
              <li>Optimal Iterations: <span className="text-slate-900 dark:text-white font-semibold">k ≈ ⌊(π/4)√(N/M)⌋</span></li>
              <li>Success Probability: <span className="text-slate-900 dark:text-white font-semibold">P(k) = sin²((2k+1)θ/2)</span></li>
              <li>Speedup: <span className="text-quantum-simulated dark:text-quantum-simulatedLight font-semibold">Quadratic O(√N)</span></li>
            </ul>
          </div>

          {/* Col 3: Research References */}
          <div>
            <h4 className="font-display font-semibold text-xs text-ink-light dark:text-ink-dark uppercase tracking-wider mb-3">
              Resources & Specs
            </h4>
            <ul className="space-y-2 text-xs text-ink-mutedLight dark:text-ink-mutedDark">
              <li>
                <a
                  href="https://arxiv.org/abs/quant-ph/9605043"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-quantum-theoretical dark:hover:text-quantum-theoreticalLight flex items-center gap-1 transition-colors"
                >
                  <span>Lov K. Grover (1996) Paper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.quantum.ibm.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-quantum-theoretical dark:hover:text-quantum-theoreticalLight flex items-center gap-1 transition-colors"
                >
                  <span>IBM Qiskit Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://qiskit.org/textbook/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-quantum-theoretical dark:hover:text-quantum-theoreticalLight flex items-center gap-1 transition-colors"
                >
                  <span>Qiskit Textbook: Grover's</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-mutedLight dark:text-ink-mutedDark gap-2">
          <p>© {new Date().getFullYear()} GroverLab Research Project. Open Quantum Algorithm Laboratory.</p>
          <p className="font-mono text-[11px]">Designed for Quantum Computing Research & Education</p>
        </div>
      </div>
    </footer>
  );
};
