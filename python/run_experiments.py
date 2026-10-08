"""
Grover's Algorithm Master Experiment Runner
Executes full benchmark suite across 2, 3, and 4 qubits.
Evaluates ideal simulation, noisy simulation, and real hardware options.
Computes Search Difficulty Scores (SDS), exports CSV results, and generates publication plots.
"""

import os
import csv
import numpy as np
import matplotlib.pyplot as plt
from typing import List, Dict

from qiskit_grover import (
    build_grover_circuit,
    calculate_optimal_iterations,
    simulate_ideal,
    sweep_iterations
)
from noisy_simulation import simulate_noisy, create_realistic_noise_model
from ibm_hardware import run_on_ibm_hardware
from sds import calculate_sds, tune_weights_example, validate_sds_correlation


def run_full_suite():
    print("=" * 70)
    print("GROVER'S QUANTUM SEARCH ALGORITHM BENCHMARK SUITE")
    print("=" * 70)
    
    # Target configurations (2, 3, and 4 qubits)
    test_configs = [
        {"id": "2Q_1T", "qubits": 2, "targets": ["11"], "desc": "2-Qubit Single Target"},
        {"id": "2Q_2T", "qubits": 2, "targets": ["01", "11"], "desc": "2-Qubit Multi Target"},
        {"id": "3Q_1T", "qubits": 3, "targets": ["101"], "desc": "3-Qubit Single Target"},
        {"id": "3Q_2T", "qubits": 3, "targets": ["011", "111"], "desc": "3-Qubit Multi Target"},
        {"id": "4Q_1T", "qubits": 4, "targets": ["1101"], "desc": "4-Qubit Single Target"},
        {"id": "4Q_2T", "qubits": 4, "targets": ["1001", "1111"], "desc": "4-Qubit Multi Target"},
    ]
    
    shots = 2048
    noise_model = create_realistic_noise_model()
    
    results = []
    sweep_data = {}
    
    print("\n[1/4] Running Ideal & Noisy Aer Quantum Simulations...")
    for cfg in test_configs:
        n = cfg["qubits"]
        targets = cfg["targets"]
        m = len(targets)
        N = 2 ** n
        k_opt = calculate_optimal_iterations(n, m)
        
        # Build circuit for optimal k
        qc = build_grover_circuit(n, targets, iterations=k_opt)
        depth = qc.depth()
        
        # 1. Ideal Aer simulation
        ideal_counts = simulate_ideal(qc, shots=shots)
        ideal_success = sum(ideal_counts.get(t.zfill(n), 0) for t in targets) / shots
        
        # 2. Noisy Aer simulation
        noisy_counts = simulate_noisy(qc, noise_model=noise_model, shots=shots)
        noisy_success = sum(noisy_counts.get(t.zfill(n), 0) for t in targets) / shots
        
        # 3. Iteration sweep (k_opt - 2 to k_opt + 2)
        sweeps = sweep_iterations(n, targets, shots=shots)
        sweep_data[cfg["id"]] = sweeps
        
        # 4. Hardware check
        hw_counts, hw_meta = run_on_ibm_hardware(qc, shots=shots)
        if hw_counts:
            hw_success = sum(hw_counts.get(t.zfill(n), 0) for t in targets) / shots
            hw_status = f"{hw_success * 100:.1f}% ({hw_meta.get('backend_name')})"
        else:
            hw_success = None
            hw_status = "N/A (Token Req)"
            
        results.append({
            "id": cfg["id"],
            "desc": cfg["desc"],
            "qubits": n,
            "N": N,
            "M": m,
            "target_states": ", ".join(targets),
            "optimal_iterations": k_opt,
            "ideal_success_prob": round(ideal_success, 4),
            "noisy_success_prob": round(noisy_success, 4),
            "hardware_success_prob": hw_status if hw_success is None else round(hw_success, 4),
            "circuit_depth": depth
        })
        
        print(f"  - {cfg['desc']}: N={N}, M={m} | k_opt={k_opt} | Ideal={ideal_success*100:.1f}% | Noisy={noisy_success*100:.1f}% | Depth={depth}")

    # [2/4] Search Difficulty Score (SDS) Calculation
    print("\n[2/4] Computing Search Difficulty Scores (SDS) & Weight Tuning...")
    sds_results = calculate_sds(results, weights=(0.35, 0.35, 0.30))
    
    # Weight tuning example report
    tuning_report = tune_weights_example(results)
    print(f"  - Initial Spearman Correlation (w=[0.05, 0.05, 0.90]): rho = {tuning_report['before']['spearman_rho']}")
    print(f"  - Calibrated Spearman Correlation (w=[0.35, 0.35, 0.30]): rho = {tuning_report['after']['spearman_rho']}")
    print(f"  - Correlation Improvement: +{tuning_report['improvement']}")

    # Ensure output directories exist
    os.makedirs("python/results", exist_ok=True)
    os.makedirs("public/results", exist_ok=True)

    # [3/4] Export Results to CSV
    csv_path_py = "python/results/grover_benchmark_results.csv"
    csv_path_pub = "public/results/grover_benchmark_results.csv"
    
    fieldnames = [
        "qubits", "N", "M", "target_states", "optimal_iterations",
        "ideal_success_prob", "noisy_success_prob", "hardware_success_prob",
        "circuit_depth", "n_norm", "nm_norm", "noise_norm", "actual_degradation", "sds_score"
    ]
    
    for path in [csv_path_py, csv_path_pub]:
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(sds_results)
            
    print(f"\n[3/4] Exported CSV benchmark results to:")
    print(f"  - {csv_path_py}")
    print(f"  - {csv_path_pub}")

    # [4/4] Generate Matplotlib Publication Plots
    print("\n[4/4] Generating Publication-Quality Benchmark Plots...")
    generate_plots(sweep_data, sds_results, tuning_report)
    
    print("\n" + "=" * 70)
    print("GROVER'S EXPERIMENT BENCHMARK RUN COMPLETED SUCCESSFULLY!")
    print("=" * 70)


def generate_plots(sweep_data: Dict, sds_results: List[Dict], tuning_report: Dict):
    plt.style.use('seaborn-v0_8-darkgrid' if 'seaborn-v0_8-darkgrid' in plt.style.available else 'default')
    
    # -------------------------------------------------------------
    # Plot 1: Success Probability vs. Iteration Count
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 5.5), dpi=300)
    
    colors = {
        "2Q_1T": "#4F46E5",
        "2Q_2T": "#818CF8",
        "3Q_1T": "#0D9488",
        "3Q_2T": "#2DD4BF",
        "4Q_1T": "#D97706",
        "4Q_2T": "#FBBF24"
    }
    
    for config_id, sweeps in sweep_data.items():
        ks = [s["k"] for s in sweeps]
        probs = [s["success_prob"] * 100 for s in sweeps]
        ax.plot(ks, probs, marker='o', linewidth=2, label=config_id, color=colors.get(config_id, "#64748B"))
        
    ax.set_title("Grover's Algorithm: Success Probability P(k) vs. Iterations (k)", fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel("Grover Iterations (k)", fontsize=11, labelpad=8)
    ax.set_ylabel("Ideal Success Probability (%)", fontsize=11, labelpad=8)
    ax.set_ylim(0, 105)
    ax.legend(title="Quantum Configs", frameon=True, facecolor='white', framealpha=0.9)
    ax.grid(True, linestyle='--', alpha=0.5)
    
    plt.tight_layout()
    plt.savefig("python/results/success_prob_vs_iterations.png")
    plt.savefig("public/results/success_prob_vs_iterations.png")
    plt.close()
    
    # -------------------------------------------------------------
    # Plot 2: SDS Score vs. Observed Probability Degradation
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(8.5, 5.5), dpi=300)
    
    sds_scores = [c["sds_score"] for c in sds_results]
    degradations = [c["actual_degradation"] * 100 for c in sds_results]
    labels = [c["id"] for c in sds_results]
    
    ax.scatter(sds_scores, degradations, s=120, color="#4F46E5", edgecolors="#1E1B4B", linewidth=1.5, zorder=3)
    
    for idx, txt in enumerate(labels):
        ax.annotate(txt, (sds_scores[idx], degradations[idx]), xytext=(6, -4), textcoords='offset points', fontsize=9, fontweight='bold')
        
    # Fit linear trend line
    if len(sds_scores) > 1:
        z = np.polyfit(sds_scores, degradations, 1)
        p = np.poly1d(z)
        x_line = np.linspace(min(sds_scores), max(sds_scores), 100)
        ax.plot(x_line, p(x_line), "--", color="#0D9488", linewidth=1.5, label="Linear Fit", zorder=2)
        
    rho = tuning_report['after']['spearman_rho']
    ax.set_title("Search Difficulty Score (SDS) vs. Actual Noise Degradation", fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel("Search Difficulty Score (SDS)", fontsize=11, labelpad=8)
    ax.set_ylabel("Observed Degradation ΔP (%)", fontsize=11, labelpad=8)
    
    # Stat box overlay
    stat_text = f"Spearman Correlation ρ = {rho:.3f}\nCalibrated Weights: w = (0.35, 0.35, 0.30)"
    ax.text(0.05, 0.90, stat_text, transform=ax.transAxes, fontsize=9, fontfamily='monospace',
            bbox=dict(boxstyle="round,pad=0.5", facecolor="white", alpha=0.9, edgecolor="#CBD5E1"))
            
    ax.legend(loc='lower right', frameon=True)
    ax.grid(True, linestyle='--', alpha=0.5)
    
    plt.tight_layout()
    plt.savefig("python/results/sds_vs_degradation.png")
    plt.savefig("public/results/sds_vs_degradation.png")
    plt.close()
    
    print("  - Saved plot: success_prob_vs_iterations.png")
    print("  - Saved plot: sds_vs_degradation.png")


if __name__ == "__main__":
    run_full_suite()
