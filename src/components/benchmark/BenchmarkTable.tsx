import React, { useEffect, useState } from 'react';
import type { BenchmarkRow } from '../../lib/types';
import { groverApi } from '../../lib/groverApi';
import { Download, Table, ArrowUpDown } from 'lucide-react';

export const BenchmarkTable: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkRow[]>([]);
  const [filterQubits, setFilterQubits] = useState<number | 'all'>('all');
  const [sortField, setSortField] = useState<keyof BenchmarkRow>('numQubits');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    groverApi.getBenchmarkSuite().then(setBenchmarks);
  }, []);

  const handleSort = (field: keyof BenchmarkRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = benchmarks.filter((b) => {
    if (filterQubits === 'all') return true;
    return b.numQubits === filterQubits;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const exportToCSV = () => {
    const headers = ['Qubits', 'N (Total)', 'M (Marked)', 'Target States', 'Theta (rad)', 'Optimal k', 'Max P(k)', 'Classical Queries', 'Speedup Factor'];
    const rows = benchmarks.map((b) => [
      b.numQubits,
      b.totalStates,
      b.markedCount,
      `"${b.targetStatesStr}"`,
      b.thetaRad,
      b.optimalIterations,
      `${(b.theoreticalMaxProb * 100).toFixed(1)}%`,
      b.classicalAvgQueries,
      `${b.speedupFactor}x`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `groverlab_benchmarks_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="quantum-card p-6 space-y-4 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Table className="w-4 h-4 text-quantum-theoretical" />
          <h3 className="font-display font-semibold text-base text-ink-light dark:text-ink-dark">
            Standard Grover Benchmark Suite (2–4 Qubits)
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {/* Qubit Filter */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setFilterQubits('all')}
              className={`px-2.5 py-1 rounded font-mono ${filterQubits === 'all' ? 'bg-white dark:bg-surface-dark font-bold shadow-xs' : 'text-slate-500'}`}
            >
              All Qubits
            </button>
            <button
              onClick={() => setFilterQubits(2)}
              className={`px-2.5 py-1 rounded font-mono ${filterQubits === 2 ? 'bg-white dark:bg-surface-dark font-bold shadow-xs' : 'text-slate-500'}`}
            >
              2Q
            </button>
            <button
              onClick={() => setFilterQubits(3)}
              className={`px-2.5 py-1 rounded font-mono ${filterQubits === 3 ? 'bg-white dark:bg-surface-dark font-bold shadow-xs' : 'text-slate-500'}`}
            >
              3Q
            </button>
            <button
              onClick={() => setFilterQubits(4)}
              className={`px-2.5 py-1 rounded font-mono ${filterQubits === 4 ? 'bg-white dark:bg-surface-dark font-bold shadow-xs' : 'text-slate-500'}`}
            >
              4Q
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('numQubits')}>
                <div className="flex items-center gap-1">
                  <span>Qubits</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-3">Search Space N</th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('markedCount')}>
                <div className="flex items-center gap-1">
                  <span>Marked (M)</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-3">Targets</th>
              <th className="py-2.5 px-3">Theta θ</th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('optimalIterations')}>
                <div className="flex items-center gap-1">
                  <span>Optimal k</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-3">Max P(k)</th>
              <th className="py-2.5 px-3">Classical Queries</th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('speedupFactor')}>
                <div className="flex items-center gap-1">
                  <span>Speedup</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {sorted.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{row.numQubits} Qubits</td>
                <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">N = {row.totalStates}</td>
                <td className="py-2.5 px-3 font-semibold text-quantum-marked dark:text-quantum-markedLight">M = {row.markedCount}</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{row.targetStatesStr}</td>
                <td className="py-2.5 px-3 text-slate-500">{row.thetaRad} rad</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">k = {row.optimalIterations}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{(row.theoreticalMaxProb * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-slate-500">{row.classicalAvgQueries} queries</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-quantum-simulated/15 text-quantum-simulated dark:text-quantum-simulatedLight font-bold">
                    {row.speedupFactor}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
