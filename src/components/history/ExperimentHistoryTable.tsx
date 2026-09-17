import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { History, Trash2, Download, Search } from 'lucide-react';

export const ExperimentHistoryTable: React.FC = () => {
  const { savedExperiments, deleteSavedExperiment } = useExperiment();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = savedExperiments.filter(
    (exp) =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.config.targetStates.join(' ').includes(searchTerm)
  );

  const exportHistoryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedExperiments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `grover_lab_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="history" className="quantum-card p-6 sm:p-8 space-y-6 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-quantum-theoretical" />
          <div>
            <h2 className="font-display font-bold text-xl text-ink-light dark:text-ink-dark">
              Saved Experiment Run History
            </h2>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">
              Persisted experiment records in localStorage abstraction.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none w-44 sm:w-56"
            />
          </div>

          <button
            onClick={exportHistoryJSON}
            disabled={savedExperiments.length === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold disabled:opacity-40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-slate-400 space-y-2">
          <p>No saved experiment history found.</p>
          <p className="text-[11px] text-slate-500">Run a simulation and click "Save Experiment" to record configuration snapshots here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Experiment Name</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Config (n, M, k)</th>
                <th className="py-2.5 px-3">Target States</th>
                <th className="py-2.5 px-3">Theoretical P(k)</th>
                <th className="py-2.5 px-3">Empirical Rate</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{item.name}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                    {item.config.numQubits}Q, M={item.config.targetStates.length}, k={item.config.iterations}
                  </td>
                  <td className="py-2.5 px-3 text-quantum-marked dark:text-quantum-markedLight font-semibold">
                    {item.config.targetStates.map((s) => '|' + s + '⟩').join(', ')}
                  </td>
                  <td className="py-2.5 px-3 text-quantum-theoretical dark:text-quantum-theoreticalLight font-bold">
                    {(item.result.theoreticalProb * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-quantum-simulated dark:text-quantum-simulatedLight font-bold">
                    {(item.result.empiricalSuccessRate * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => deleteSavedExperiment(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete run"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
