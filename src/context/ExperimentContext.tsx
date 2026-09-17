import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  GroverExperimentConfig,
  GroverExperimentResult,
  SavedExperiment,
  QubitCount
} from '../lib/types';
import { groverApi } from '../lib/groverApi';
import { getSavedExperiments, saveExperiment, deleteExperiment as removeSavedExperiment, getStoredTheme, setStoredTheme } from '../lib/storage';
import { calculateOptimalIterations } from '../lib/grover-math';

interface ExperimentContextType {
  config: GroverExperimentConfig;
  result: GroverExperimentResult | null;
  isRunning: boolean;
  theme: 'light' | 'dark';
  savedExperiments: SavedExperiment[];
  activeTab: 'experiment' | 'benchmark' | 'code' | 'methodology' | 'history';
  setNumQubits: (n: QubitCount) => void;
  toggleTargetState: (binaryState: string) => void;
  setIterations: (k: number) => void;
  setShots: (shots: number) => void;
  setNoiseLevel: (noise: number) => void;
  setAutoOptimalIterations: () => void;
  loadPreset: (presetId: string) => void;
  runExperiment: () => Promise<void>;
  saveCurrentExperiment: (customName?: string) => SavedExperiment | null;
  deleteSavedExperiment: (id: string) => void;
  toggleTheme: () => void;
  setActiveTab: (tab: 'experiment' | 'benchmark' | 'code' | 'methodology' | 'history') => void;
}

const defaultConfig: GroverExperimentConfig = {
  numQubits: 3,
  targetStates: ['101'],
  iterations: 2,
  shots: 1000,
  noiseLevel: 0,
};

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined);

export const ExperimentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<GroverExperimentConfig>(defaultConfig);
  const [result, setResult] = useState<GroverExperimentResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [savedExperiments, setSavedExperiments] = useState<SavedExperiment[]>([]);
  const [activeTab, setActiveTab] = useState<'experiment' | 'benchmark' | 'code' | 'methodology' | 'history'>('experiment');

  // Initialize theme and history on mount
  useEffect(() => {
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setSavedExperiments(getSavedExperiments());

    // Initial simulation run
    groverApi.executeExperiment(defaultConfig).then(setResult);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const runSimulation = useCallback(async (currentConfig: GroverExperimentConfig) => {
    setIsRunning(true);
    try {
      const res = await groverApi.executeExperiment(currentConfig);
      setResult(res);
    } catch (err) {
      console.error('Error running Grover simulation:', err);
    } finally {
      setIsRunning(false);
    }
  }, []);

  const setNumQubits = (numQubits: QubitCount) => {
    // When qubit count changes, default target state to all 1s for that qubit size
    const defaultTarget = '1'.repeat(numQubits);
    const newConfig: GroverExperimentConfig = {
      ...config,
      numQubits,
      targetStates: [defaultTarget],
      iterations: calculateOptimalIterations(1, Math.pow(2, numQubits)),
    };
    setConfig(newConfig);
    runSimulation(newConfig);
  };

  const toggleTargetState = (binaryState: string) => {
    const isTarget = config.targetStates.includes(binaryState);
    let newTargets: string[];

    if (isTarget) {
      // Prevent unchecking all target states
      if (config.targetStates.length <= 1) return;
      newTargets = config.targetStates.filter((s) => s !== binaryState);
    } else {
      newTargets = [...config.targetStates, binaryState];
    }

    const totalStates = Math.pow(2, config.numQubits);
    const newOptimalK = calculateOptimalIterations(newTargets.length, totalStates);

    const newConfig: GroverExperimentConfig = {
      ...config,
      targetStates: newTargets,
      iterations: newOptimalK, // Auto-update iteration to optimal when target count changes
    };

    setConfig(newConfig);
    runSimulation(newConfig);
  };

  const setIterations = (iterations: number) => {
    const newConfig = { ...config, iterations };
    setConfig(newConfig);
    runSimulation(newConfig);
  };

  const setShots = (shots: number) => {
    const newConfig = { ...config, shots };
    setConfig(newConfig);
    runSimulation(newConfig);
  };

  const setNoiseLevel = (noiseLevel: number) => {
    const newConfig = { ...config, noiseLevel };
    setConfig(newConfig);
    runSimulation(newConfig);
  };

  const setAutoOptimalIterations = () => {
    const totalStates = Math.pow(2, config.numQubits);
    const optimalK = calculateOptimalIterations(config.targetStates.length, totalStates);
    setIterations(optimalK);
  };

  const loadPreset = (presetId: string) => {
    let presetConfig: GroverExperimentConfig;

    switch (presetId) {
      case '2q-single':
        presetConfig = { numQubits: 2, targetStates: ['11'], iterations: 1, shots: 1000, noiseLevel: 0, presetId };
        break;
      case '2q-dual':
        presetConfig = { numQubits: 2, targetStates: ['01', '10'], iterations: 1, shots: 1000, noiseLevel: 0, presetId };
        break;
      case '3q-single':
        presetConfig = { numQubits: 3, targetStates: ['101'], iterations: 2, shots: 1000, noiseLevel: 0, presetId };
        break;
      case '3q-triple':
        presetConfig = { numQubits: 3, targetStates: ['001', '010', '100'], iterations: 1, shots: 1000, noiseLevel: 0, presetId };
        break;
      case '4q-single':
        presetConfig = { numQubits: 4, targetStates: ['1010'], iterations: 3, shots: 1000, noiseLevel: 0, presetId };
        break;
      case '4q-quad':
        presetConfig = { numQubits: 4, targetStates: ['0001', '0010', '0100', '1000'], iterations: 1, shots: 1000, noiseLevel: 0, presetId };
        break;
      default:
        return;
    }

    setConfig(presetConfig);
    runSimulation(presetConfig);
  };

  const runExperiment = async () => {
    await runSimulation(config);
  };

  const saveCurrentExperiment = (customName?: string) => {
    if (!result) return null;
    const saved = saveExperiment(customName || '', config, result);
    setSavedExperiments(getSavedExperiments());
    return saved;
  };

  const deleteSavedExperiment = (id: string) => {
    const updated = removeSavedExperiment(id);
    setSavedExperiments(updated);
  };

  return (
    <ExperimentContext.Provider
      value={{
        config,
        result,
        isRunning,
        theme,
        savedExperiments,
        activeTab,
        setNumQubits,
        toggleTargetState,
        setIterations,
        setShots,
        setNoiseLevel,
        setAutoOptimalIterations,
        loadPreset,
        runExperiment,
        saveCurrentExperiment,
        deleteSavedExperiment,
        toggleTheme,
        setActiveTab,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider');
  }
  return context;
};
