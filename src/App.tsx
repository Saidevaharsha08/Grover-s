import React from 'react';
import { ExperimentProvider } from './context/ExperimentContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { OverviewSection } from './components/overview/OverviewSection';
import { ExperimentPanel } from './components/experiment/ExperimentPanel';
import { TheoreticalCard } from './components/results/TheoreticalCard';
import { SimulationDashboard } from './components/results/SimulationDashboard';
import { ProbabilityChart } from './components/visualization/ProbabilityChart';
import { AmplitudeEvolution } from './components/visualization/AmplitudeEvolution';
import { GeometricRotation2D } from './components/visualization/GeometricRotation2D';
import { CircuitDiagram } from './components/visualization/CircuitDiagram';
import { OraclePanel } from './components/visualization/OraclePanel';
import { BenchmarkTable } from './components/benchmark/BenchmarkTable';
import { MarkedStatesComparison } from './components/benchmark/MarkedStatesComparison';
import { QubitScalingCards } from './components/benchmark/QubitScalingCards';
import { KeyFindings } from './components/benchmark/KeyFindings';
import { QiskitCodePanel } from './components/code/QiskitCodePanel';
import { MethodologySection } from './components/methodology/MethodologySection';
import { ExperimentHistoryTable } from './components/history/ExperimentHistoryTable';

const GroverLabApp: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-1 space-y-16 sm:space-y-24">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Research Overview */}
        <OverviewSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 3. Core Experiment Configuration Workbench */}
          <ExperimentPanel />

          {/* 4. Results & Key Analytical Baselines */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Simulation Results & Analytical Baseline
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <TheoreticalCard />
              <SimulationDashboard />
            </div>
          </div>

          {/* 5. Quantum State & Probability Visualizations */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Interactive Quantum State Visualizations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProbabilityChart />
              <GeometricRotation2D />
            </div>
            <AmplitudeEvolution />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CircuitDiagram />
              <OraclePanel />
            </div>
          </div>

          {/* 6. Benchmarking & Scaling Suite */}
          <div id="benchmark" className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Quantum Algorithm Benchmarks & Scaling Analysis
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Empirical query comparison across search space sizes N and marked target counts M.
              </p>
            </div>

            <BenchmarkTable />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarkedStatesComparison />
              <QubitScalingCards />
            </div>
            <KeyFindings />
          </div>

          {/* 7. Executable Qiskit Code Export */}
          <QiskitCodePanel />

          {/* 8. Theoretical Methodology */}
          <MethodologySection />

          {/* 9. Experiment Run History */}
          <ExperimentHistoryTable />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ExperimentProvider>
      <GroverLabApp />
    </ExperimentProvider>
  );
}
