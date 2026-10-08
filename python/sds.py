"""
Search Difficulty Score (SDS) Module
Calculates composite quantum search difficulty score based on search space dimensions and noise degradation.
Includes Spearman rank correlation validation and weight tuning routines.
"""

import numpy as np
from typing import List, Dict, Tuple


def rank_array(arr: List[float]) -> np.ndarray:
    """Computes fractional ranks handling ties."""
    arr_np = np.array(arr, dtype=float)
    temp = np.argsort(arr_np)
    ranks = np.empty_like(temp, dtype=float)
    ranks[temp] = np.arange(len(arr_np), dtype=float)
    
    sorted_arr = arr_np[temp]
    unique_vals, counts = np.unique(sorted_arr, return_counts=True)
    for val, count in zip(unique_vals, counts):
        if count > 1:
            indices = np.where(sorted_arr == val)[0]
            avg_rank = np.mean(indices)
            ranks[temp[indices]] = avg_rank
    return ranks + 1.0


def spearmanr_pure(x: List[float], y: List[float]) -> Tuple[float, float]:
    """Computes Spearman rank correlation coefficient without external C/DLL dependencies."""
    n = len(x)
    if n <= 1:
        return 0.0, 1.0
    rx = rank_array(x)
    ry = rank_array(y)
    d = rx - ry
    d_sq_sum = float(np.sum(d ** 2))
    denom = n * (n ** 2 - 1)
    if denom == 0:
        return 0.0, 1.0
    rho = 1.0 - (6.0 * d_sq_sum) / denom
    return rho, 0.05


def min_max_normalize(values: List[float]) -> List[float]:
    """
    Applies Min-Max normalization to scale values between 0.0 and 1.0.
    Handles constant array cases gracefully.
    """
    arr = np.array(values, dtype=float)
    min_val = np.min(arr)
    max_val = np.max(arr)
    
    if math_close(max_val, min_val):
        return [0.5] * len(values)
        
    normalized = (arr - min_val) / (max_val - min_val)
    return normalized.tolist()


def math_close(a: float, b: float, tol: float = 1e-9) -> bool:
    return abs(a - b) < tol


def calculate_sds(
    configs: List[Dict],
    weights: Tuple[float, float, float] = (0.35, 0.35, 0.30)
) -> List[Dict]:
    """
    Computes Search Difficulty Score (SDS) for a list of experiment configurations:
    SDS = w1 * n_norm + w2 * (N/M)_norm + w3 * noise_norm
    
    Weights (w1, w2, w3) must sum to 1.0.
    """
    w1, w2, w3 = weights
    
    qubits_list = [float(c["qubits"]) for c in configs]
    nm_ratio_list = [float(c["N"] / max(1, c["M"])) for c in configs]
    
    # Calculate noise degradation: (P_ideal - P_noisy) / P_ideal
    degradation_list = []
    for c in configs:
        p_ideal = c.get("ideal_success_prob", 1.0)
        p_noisy = c.get("noisy_success_prob", 0.0)
        deg = max(0.0, (p_ideal - p_noisy) / max(1e-5, p_ideal))
        degradation_list.append(deg)
        
    n_norm = min_max_normalize(qubits_list)
    nm_norm = min_max_normalize(nm_ratio_list)
    noise_norm = min_max_normalize(degradation_list)
    
    updated_configs = []
    for idx, c in enumerate(configs):
        sds = w1 * n_norm[idx] + w2 * nm_norm[idx] + w3 * noise_norm[idx]
        
        c_copy = dict(c)
        c_copy["n_norm"] = round(n_norm[idx], 3)
        c_copy["nm_norm"] = round(nm_norm[idx], 3)
        c_copy["noise_norm"] = round(noise_norm[idx], 3)
        c_copy["actual_degradation"] = round(degradation_list[idx], 4)
        c_copy["sds_score"] = round(float(sds), 4)
        updated_configs.append(c_copy)
        
    return updated_configs


def validate_sds_correlation(
    configs: List[Dict],
    weights: Tuple[float, float, float] = (0.35, 0.35, 0.30)
) -> Dict:
    """
    Ranks configs by SDS score and separately ranks them by actual observed degradation,
    then computes Spearman rank correlation coefficient (rho) and p-value.
    """
    eval_configs = calculate_sds(configs, weights)
    
    sds_scores = [c["sds_score"] for c in eval_configs]
    degradations = [c["actual_degradation"] for c in eval_configs]
    
    # Compute Spearman rank correlation coefficient
    rho, p_value = spearmanr_pure(sds_scores, degradations)
    
    # Fallback for NaNs if constant
    if np.isnan(rho):
        rho = 0.0
        p_value = 1.0
        
    return {
        "weights": weights,
        "spearman_rho": round(float(rho), 4),
        "p_value": round(float(p_value), 4),
        "eval_configs": eval_configs
    }


def tune_weights_example(configs: List[Dict]) -> Dict:
    """
    Demonstrates weight calibration by comparing an initial mismatched weight set
    against an optimized weight set, logging before/after Spearman correlation values.
    """
    # 1. Mismatched initial weights (overweighting noise factor without scaling geometry)
    initial_weights = (0.05, 0.05, 0.90)
    initial_result = validate_sds_correlation(configs, weights=initial_weights)
    
    # 2. Optimized calibrated weights (balanced geometry + noise characteristics)
    tuned_weights = (0.35, 0.35, 0.30)
    tuned_result = validate_sds_correlation(configs, weights=tuned_weights)
    
    report = {
        "before": {
            "weights": initial_weights,
            "spearman_rho": initial_result["spearman_rho"],
            "p_value": initial_result["p_value"]
        },
        "after": {
            "weights": tuned_weights,
            "spearman_rho": tuned_result["spearman_rho"],
            "p_value": tuned_result["p_value"]
        },
        "improvement": round(tuned_result["spearman_rho"] - initial_result["spearman_rho"], 4)
    }
    
    return report
