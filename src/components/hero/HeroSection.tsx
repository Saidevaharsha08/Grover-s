import React, { useState, useEffect } from 'react';
import { Play, BarChart3, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExperiment } from '../../context/ExperimentContext';

export const HeroSection: React.FC = () => {
  const { runExperiment, setActiveTab } = useExperiment();

  const [demoK, setDemoK] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoK((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const demoStates = [
    { label: '|000⟩', isTarget: false },
    { label: '|001⟩', isTarget: false },
    { label: '|010⟩', isTarget: false },
    { label: '|011⟩', isTarget: false },
    { label: '|100⟩', isTarget: false },
    { label: '|101⟩', isTarget: true },
    { label: '|110⟩', isTarget: false },
    { label: '|111⟩', isTarget: false },
  ];

  const demoAmplitudes = [
    [0.354, 0.354, 0.354, 0.354, 0.354, 0.354, 0.354, 0.354],
    [0.177, 0.177, 0.177, 0.177, 0.177, 0.884, 0.177, 0.177],
    [-0.086, -0.086, -0.086, -0.086, -0.086, 0.947, -0.086, -0.086],
    [0.358, 0.358, 0.358, 0.358, 0.358, 0.331, 0.358, 0.358],
  ];

  const currentAmps = demoAmplitudes[demoK];
  const currentMarkedProb = Math.pow(currentAmps[5], 2);

  const handleScrollTo = (id: string, tab: 'experiment' | 'benchmark') => {
    setActiveTab(tab);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-slate-800">
      
      {/* Soft Background Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 to-teal-500/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-mono text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quantum Algorithm Benchmarking Suite</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.1]"
            >
              Explore Grover's <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                Quantum Advantage
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Implement, simulate, and benchmark Grover's Search Algorithm across different oracle sizes, marked states, and iteration counts. Experience quadratic speedup in an interactive laboratory.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  handleScrollTo('#experiment', 'experiment');
                  runExperiment();
                }}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Run an Experiment</span>
              </button>

              <button
                onClick={() => handleScrollTo('#benchmark', 'benchmark')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs hover:shadow transition-all"
              >
                <BarChart3 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>View Benchmarks</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
              </button>
            </motion.div>

            {/* Quick Invariants Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-600 dark:text-slate-400 block font-semibold">Classical Time</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">O(N) queries</span>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400 block font-semibold">Quantum Time</span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">O(√N) queries</span>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400 block font-semibold">Max Speedup</span>
                <span className="text-indigo-700 dark:text-indigo-300 font-bold">Quadratic √N</span>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="quantum-card p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    LIVE AMPLITUDE READOUT
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    N = 8 (3Q)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
                    Target: |101⟩
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono font-semibold">GROVER ITERATION</span>
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    k = {demoK} {demoK === 2 ? '(Optimal Peak!)' : demoK === 3 ? '(Over-rotated)' : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono font-semibold">P(|101⟩ SUCCESS)</span>
                  <span className="font-mono font-bold text-sm text-teal-600 dark:text-teal-400">
                    {(currentMarkedProb * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {demoStates.map((st, idx) => {
                  const amp = currentAmps[idx];
                  const prob = Math.pow(amp, 2);
                  const isMarked = st.isTarget;

                  return (
                    <div key={st.label} className="flex items-center space-x-3 text-xs font-mono">
                      <span className={`w-12 ${isMarked ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>
                        {st.label}
                      </span>
                      <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-5 rounded-md overflow-hidden relative flex items-center">
                        <motion.div
                          initial={false}
                          animate={{ width: `${Math.max(2, prob * 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className={`h-full rounded-md transition-colors ${
                            isMarked
                              ? 'bg-amber-500'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                      </div>
                      <span className={`w-14 text-right ${isMarked ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>
                        {(prob * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 text-center font-mono pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
                Phase inversion flips target sign → Diffuser reflects amplitudes about the mean μ
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
