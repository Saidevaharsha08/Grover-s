# 🐍 Standalone Qiskit Quantum Laboratory & SDS Benchmarking Suite

This folder contains the **standalone Python Qiskit implementation** of Grover's Quantum Search Algorithm, complete with noise modeling, IBM Quantum hardware integration scripts, Search Difficulty Score (SDS) analysis, and automated experiment runners.

---

## 📁 File Overview

- `qiskit_grover.py`: Core Qiskit circuit generator (`build_oracle`, `build_diffuser`, `build_grover_circuit`), ideal `AerSimulator` execution, and optimal iteration sweeps.
- `noisy_simulation.py`: Realistic physical noise simulation using `qiskit_aer.noise.NoiseModel` (gate depolarization, thermal relaxation, and measurement readout errors).
- `ibm_hardware.py`: Real IBM Quantum hardware job submission script using `qiskit-ibm-runtime` (with safe token checks).
- `sds.py`: Search Difficulty Score module implementing $SDS = w_1 \cdot n_{\text{norm}} + w_2 \cdot (N/M)_{\text{norm}} + w_3 \cdot \text{noise}_{\text{norm}}$, Spearman rank correlation validation, and weight calibration routines.
- `run_experiments.py`: Master experiment runner script. Sweeps $2, 3, 4$ qubits, executes ideal vs. noisy vs. hardware experiments, computes SDS scores, exports `grover_benchmark_results.csv`, and generates publication plots.

---

## 🛠️ Requirements & Setup

### Prerequisites
- Python 3.10+ installed on your system.

### Virtual Environment Setup
A virtual environment has been initialized in `python/venv`. To activate and run:

#### On Windows (PowerShell):
```powershell
.\python\venv\Scripts\Activate.ps1
```

#### On Windows (CMD):
```cmd
python\venv\Scripts\activate.bat
```

#### On Linux / macOS:
```bash
source python/venv/bin/activate
```

---

## 🚀 Running the Full Benchmark Suite

Run the master experiment runner:

```bash
# Using the project virtual environment
python/venv/Scripts/python python/run_experiments.py
```

### Outputs Produced:
1. **CSV Benchmark Results**:
   - `python/results/grover_benchmark_results.csv`
   - `public/results/grover_benchmark_results.csv`
2. **Matplotlib Plots**:
   - `python/results/success_prob_vs_iterations.png`
   - `python/results/sds_vs_degradation.png`

---

## 🔑 IBM Quantum Account & Real Hardware Execution

### Local vs. Hardware Execution Summary

| Feature | Runs Locally (No Token Required) | Requires IBM Quantum Account / API Token |
| :--- | :---: | :---: |
| **Parameterized Qiskit Circuit Building** | ✅ Yes | ❌ No |
| **Ideal Aer Simulation (`qiskit_aer`)** | ✅ Yes | ❌ No |
| **Noisy Aer Physical Simulation (`NoiseModel`)** | ✅ Yes | ❌ No |
| **Iteration Sweeps ($k \in [k_{\text{opt}}-2, k_{\text{opt}}+2]$)** | ✅ Yes | ❌ No |
| **Search Difficulty Score (SDS) & Spearman Correlation** | ✅ Yes | ❌ No |
| **Matplotlib Plots & CSV Export** | ✅ Yes | ❌ No |
| **Real IBM Quantum QPU Hardware Execution** | ❌ No | ✅ **Yes** |

### How to Run on Real IBM Quantum QPU:
1. Sign up for a free account at [IBM Quantum Platform](https://quantum.ibm.com/).
2. Copy your **IBM Quantum API Token** from your account dashboard.
3. Set your token as an environment variable before running:
   ```cmd
   set IBM_QUANTUM_TOKEN="your_actual_ibm_api_token_here"
   python/venv/Scripts/python python/run_experiments.py
   ```
   *If no token is set, the hardware step is safely skipped without crashing the local benchmark suite.*
