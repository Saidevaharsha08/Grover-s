import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { generateQiskitCode } from '../../lib/qiskit-generator';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

export const QiskitCodePanel: React.FC = () => {
  const { config } = useExperiment();
  const [style, setStyle] = useState<'basic' | 'grover_operator'>('basic');
  const [copied, setCopied] = useState(false);

  const code = generateQiskitCode(config, {
    includeImports: true,
    includeComments: true,
    style,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="quantum-card p-6 sm:p-8 space-y-6 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-quantum-theoretical" />
          <div>
            <h2 className="font-display font-bold text-xl text-ink-light dark:text-ink-dark">
              Dynamic Qiskit 1.x Python Code Generator
            </h2>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono mt-0.5">
              Production-ready Python code matching active experiment parameters (n={config.numQubits}, targets=[{config.targetStates.map((s) => '|' + s + '⟩').join(', ')}], k={config.iterations}).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setStyle('basic')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                style === 'basic'
                  ? 'bg-white dark:bg-surface-dark text-quantum-theoretical font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Explicit Gates
            </button>
            <button
              onClick={() => setStyle('grover_operator')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                style === 'grover_operator'
                  ? 'bg-white dark:bg-surface-dark text-quantum-theoretical font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              GroverOperator
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-quantum-theoretical text-white hover:bg-quantum-theoreticalLight font-mono text-xs font-semibold shadow-xs transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>grover_experiment.py</span>
          </div>
          <span className="text-[11px] text-slate-500">Python 3.10+ • Qiskit 1.x</span>
        </div>

        <pre className="quantum-code-block rounded-t-none font-mono text-xs leading-relaxed text-slate-200 max-h-[450px]">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
};
