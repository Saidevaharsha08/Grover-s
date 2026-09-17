import type { SavedExperiment, GroverExperimentConfig, GroverExperimentResult } from './types';

const EXPERIMENTS_STORAGE_KEY = 'grover_lab_saved_experiments';
const THEME_STORAGE_KEY = 'grover_lab_theme';

export function getSavedExperiments(): SavedExperiment[] {
  try {
    const raw = localStorage.getItem(EXPERIMENTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedExperiment[];
  } catch (err) {
    console.error('Failed to read saved experiments from localStorage:', err);
    return [];
  }
}

export function saveExperiment(
  name: string,
  config: GroverExperimentConfig,
  result: GroverExperimentResult
): SavedExperiment {
  const experiments = getSavedExperiments();
  const newExperiment: SavedExperiment = {
    id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name || `${config.numQubits}Q ${config.targetStates.map((s) => '|' + s + '⟩').join(', ')} (k=${config.iterations})`,
    timestamp: new Date().toISOString(),
    config,
    result,
  };

  experiments.unshift(newExperiment);
  
  // Keep max 20 saved experiments
  const trimmed = experiments.slice(0, 20);

  try {
    localStorage.setItem(EXPERIMENTS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save experiment to localStorage:', err);
  }

  return newExperiment;
}

export function deleteExperiment(id: string): SavedExperiment[] {
  const experiments = getSavedExperiments().filter((exp) => exp.id !== id);
  try {
    localStorage.setItem(EXPERIMENTS_STORAGE_KEY, JSON.stringify(experiments));
  } catch (err) {
    console.error('Failed to delete experiment from localStorage:', err);
  }
  return experiments;
}

export function clearAllExperiments(): void {
  try {
    localStorage.removeItem(EXPERIMENTS_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear experiment storage:', err);
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    if (theme === 'dark' || theme === 'light') return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme setting:', err);
  }
}
