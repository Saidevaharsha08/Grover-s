import React from 'react';
import { BookOpen, Cpu, ShieldCheck, Compass, Zap } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  return (
    <section id="methodology" className="quantum-card p-6 sm:p-8 space-y-8 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-quantum-theoretical" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-ink-light dark:text-ink-dark">
            Mathematical Foundation & Quantum Mechanics Proofs
          </h2>
        </div>
        <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark">
          Comprehensive breakdown of quantum gates, operator algebra, and 2D subspace rotation mechanics.
        </p>
      </div>

      {/* Grid of Theory Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 1: Superposition */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-quantum-theoretical font-semibold text-sm font-display">
            <Cpu className="w-4 h-4" />
            <span>1. State Initialization (H^⊗n)</span>
          </div>
          <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            The algorithm begins with n qubits initialized to state |0⟩^⊗n. Applying n parallel Hadamard gates puts the system into an equal uniform superposition across all N = 2ⁿ basis states:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800">
            |s_0⟩ = H^⊗n |0⟩^⊗n = (1 / √N) ∑ |x⟩
          </div>
        </div>

        {/* Module 2: Oracle Phase Flip */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-quantum-marked font-semibold text-sm font-display">
            <Zap className="w-4 h-4" />
            <span>2. Oracle Phase Shift (U_ω)</span>
          </div>
          <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            The custom oracle U_ω flips the phase (sign) of marked target state(s) w ∈ W while leaving unmarked states unchanged:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800">
            U_ω = I - 2 ∑ |w⟩⟨w|  ⟹  U_ω |x⟩ = (-1)^f(x) |x⟩
          </div>
        </div>

        {/* Module 3: Diffuser Operator */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-quantum-simulated font-semibold text-sm font-display">
            <ShieldCheck className="w-4 h-4" />
            <span>3. Diffusion Operator (U_s)</span>
          </div>
          <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            The Grover diffusion operator performs reflection (inversion) about the mean state amplitude μ. It is constructed from Hadamard and zero-state phase gates:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800">
            U_s = 2|s⟩⟨s| - I = H^⊗n (2|0⟩⟨0| - I) H^⊗n
          </div>
        </div>

        {/* Module 4: 2D Subspace Rotation */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-500 font-semibold text-sm font-display">
            <Compass className="w-4 h-4" />
            <span>4. 2D Subspace Geometric Rotation</span>
          </div>
          <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            The composite Grover iterator G = U_s U_ω rotates the state vector in a 2D real plane spanned by unmarked states |w^⊥⟩ and marked states |w⟩ by angle θ = 2 arcsin(√(M/N)):
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800">
            |s_k⟩ = cos((2k+1)θ/2) |w^⊥⟩ + sin((2k+1)θ/2) |w⟩
          </div>
        </div>

      </div>

    </section>
  );
};
