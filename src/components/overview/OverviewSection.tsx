import React from 'react';
import { Cpu, Target, Scale, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const OverviewSection: React.FC = () => {
  const storySteps = [
    { step: '01', title: 'Oracle Size', desc: 'Define qubit register n ∈ {2,3,4} and search space N = 2ⁿ' },
    { step: '02', title: 'Marked States', desc: 'Select target basis state(s) M to be located' },
    { step: '03', title: 'Grover Iterations', desc: 'Apply Oracle phase flip U_ω and Diffuser U_s for k iterations' },
    { step: '04', title: 'Quantum Simulation', desc: 'Compute exact state vector amplitudes and sample shots' },
    { step: '05', title: 'Success Probability', desc: 'Evaluate measurement distribution and empirical fidelity' },
    { step: '06', title: 'Theoretical vs Simulated', desc: 'Compare P(k) curve with classical search performance' },
  ];

  return (
    <section id="overview" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research Overview</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            How Does Grover's Algorithm Behave as the Search Space Grows?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Grover's algorithm provides a quadratic speedup for unstructured search, reducing query complexity from <span className="font-mono font-bold text-slate-900 dark:text-slate-100">O(N)</span> to <span className="font-mono font-bold text-teal-600 dark:text-teal-400">O(√N)</span>. However, practical performance depends on the number of qubits, search-space size, number of marked states, and exact iteration count.
          </p>
        </div>

        {/* 3 Highlighted Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div
            whileHover={{ y: -4 }}
            className="quantum-card p-6 border-l-4 border-l-indigo-600 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                2–4 Qubits
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Search spaces evaluated across <span className="font-mono text-slate-900 dark:text-white font-bold">N = 4</span> (2Q), <span className="font-mono text-slate-900 dark:text-white font-bold">N = 8</span> (3Q), and <span className="font-mono text-slate-900 dark:text-white font-bold">N = 16</span> (4Q) basis states.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
              Full 2ⁿ state vector evolution
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="quantum-card p-6 border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Variable Marked States
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Single or multi-target marked states <span className="font-mono text-slate-900 dark:text-white font-bold">M ≥ 1</span>. Observe how rotation angle <span className="font-mono text-slate-900 dark:text-white font-bold">θ</span> increases and optimal iterations decrease as <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold">k ~ O(√(N/M))</span>.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
              Custom Phase Oracle U_ω
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="quantum-card p-6 border-l-4 border-l-teal-600 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Theoretical vs Simulated
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Compare exact analytical sine-squared probability curve <span className="font-mono text-slate-900 dark:text-white font-bold">P(k)</span> with Monte Carlo shot sampling and noisy quantum channel models.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
              100–10,000 Shot Monte Carlo
            </div>
          </motion.div>

        </div>

        {/* Central Story Pathway */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Central Experimental Pipeline
            </h3>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">Sequential Quantum Execution</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {storySteps.map((s, idx) => (
              <div key={s.step} className="relative group">
                <div className="quantum-card p-4 h-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                  <span className="font-mono text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    {s.step}
                  </span>
                  <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-medium">
                    {s.desc}
                  </p>
                </div>
                {idx < storySteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
