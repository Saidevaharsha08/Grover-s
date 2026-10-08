import type { GroverExperimentConfig, GroverExperimentResult, BenchmarkRow } from './types';
import { runGroverSimulation, generateBenchmarkSuite } from './grover-math';

export interface IGroverApi {
  executeExperiment(config: GroverExperimentConfig): Promise<GroverExperimentResult>;
  getBenchmarkSuite(): Promise<BenchmarkRow[]>;
}

class GroverApiClient implements IGroverApi {
  public async executeExperiment(config: GroverExperimentConfig): Promise<GroverExperimentResult> {
    // Instantaneous client-side computation without artificial setTimeout latency
    return runGroverSimulation(config);
  }

  public async getBenchmarkSuite(): Promise<BenchmarkRow[]> {
    // Instantaneous benchmark data retrieval
    return generateBenchmarkSuite();
  }
}

export const groverApi = new GroverApiClient();
