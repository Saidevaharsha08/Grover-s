import type { GroverExperimentConfig, GroverExperimentResult, BenchmarkRow } from './types';
import { runGroverSimulation, generateBenchmarkSuite } from './grover-math';

export interface IGroverApi {
  executeExperiment(config: GroverExperimentConfig): Promise<GroverExperimentResult>;
  getBenchmarkSuite(): Promise<BenchmarkRow[]>;
}

class GroverApiClient implements IGroverApi {
  private simulatedLatencyMs: number = 180;

  public async executeExperiment(config: GroverExperimentConfig): Promise<GroverExperimentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = runGroverSimulation(config);
        resolve(result);
      }, this.simulatedLatencyMs);
    });
  }

  public async getBenchmarkSuite(): Promise<BenchmarkRow[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const benchmarks = generateBenchmarkSuite();
        resolve(benchmarks);
      }, 50);
    });
  }
}

export const groverApi = new GroverApiClient();
