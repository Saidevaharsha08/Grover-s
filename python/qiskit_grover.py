"""
Qiskit Grover's Algorithm Implementation Module
Implements real parameterized Qiskit circuits for Grover's search algorithm across 2, 3, and 4 qubits.
"""

import math
from typing import List, Dict, Tuple
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator


def build_oracle(n_qubits: int, target_states: List[str]) -> QuantumCircuit:
    """
    Constructs a parameterized phase oracle gate U_w for specified target states.
    Inverts the phase of marked basis states (|x> -> -|x>).
    """
    oracle_circuit = QuantumCircuit(n_qubits, name="U_oracle")
    
    for target in target_states:
        # Pad target binary string if needed
        target_str = target.zfill(n_qubits)
        
        # Apply X gates on qubits corresponding to '0's in target
        # Qiskit uses little-endian qubit indexing (qubit 0 is LSB)
        for q in range(n_qubits):
            bit_val = target_str[n_qubits - 1 - q]
            if bit_val == '0':
                oracle_circuit.x(q)
        
        # Apply Multi-Controlled Phase/Z gate
        if n_qubits == 2:
            oracle_circuit.cz(0, 1)
        elif n_qubits == 3:
            oracle_circuit.h(2)
            oracle_circuit.mcx([0, 1], 2)
            oracle_circuit.h(2)
        elif n_qubits == 4:
            oracle_circuit.h(3)
            oracle_circuit.mcx([0, 1, 2], 3)
            oracle_circuit.h(3)
        else:
            controls = list(range(n_qubits - 1))
            target_q = n_qubits - 1
            oracle_circuit.h(target_q)
            oracle_circuit.mcx(controls, target_q)
            oracle_circuit.h(target_q)
            
        # Uncompute X gates
        for q in range(n_qubits):
            bit_val = target_str[n_qubits - 1 - q]
            if bit_val == '0':
                oracle_circuit.x(q)
                
    return oracle_circuit


def build_diffuser(n_qubits: int) -> QuantumCircuit:
    """
    Constructs the Grover diffuser operator U_s (Inversion about mean: 2|s><s| - I).
    """
    diffuser_circuit = QuantumCircuit(n_qubits, name="U_diffuser")
    
    # Apply Hadamard transform H^⊗n
    diffuser_circuit.h(range(n_qubits))
    
    # Apply Pauli-X transform X^⊗n
    diffuser_circuit.x(range(n_qubits))
    
    # Multi-controlled Z gate
    if n_qubits == 2:
        diffuser_circuit.cz(0, 1)
    elif n_qubits == 3:
        diffuser_circuit.h(2)
        diffuser_circuit.mcx([0, 1], 2)
        diffuser_circuit.h(2)
    elif n_qubits == 4:
        diffuser_circuit.h(3)
        diffuser_circuit.mcx([0, 1, 2], 3)
        diffuser_circuit.h(3)
    else:
        controls = list(range(n_qubits - 1))
        target_q = n_qubits - 1
        diffuser_circuit.h(target_q)
        diffuser_circuit.mcx(controls, target_q)
        diffuser_circuit.h(target_q)
        
    # Uncompute X^⊗n and H^⊗n
    diffuser_circuit.x(range(n_qubits))
    diffuser_circuit.h(range(n_qubits))
    
    return diffuser_circuit


def build_grover_circuit(n_qubits: int, target_states: List[str], iterations: int) -> QuantumCircuit:
    """
    Assembles complete Grover Quantum Circuit:
    Step 1: State preparation H^⊗n
    Step 2: Repeat Grover Operator (U_oracle + U_diffuser) k times
    Step 3: Measurement onto classical register
    """
    qc = QuantumCircuit(n_qubits, n_qubits)
    
    # 1. State preparation: Hadamard transform
    qc.h(range(n_qubits))
    qc.barrier()
    
    # Build gates
    oracle = build_oracle(n_qubits, target_states)
    diffuser = build_diffuser(n_qubits)
    
    # 2. Apply Grover iteration loop k times
    for _ in range(iterations):
        qc.append(oracle.to_gate(), range(n_qubits))
        qc.append(diffuser.to_gate(), range(n_qubits))
        qc.barrier()
        
    # 3. Measurement
    qc.measure(range(n_qubits), range(n_qubits))
    
    return qc


def calculate_optimal_iterations(n_qubits: int, marked_count: int) -> int:
    """
    Computes theoretical optimal iteration count: k_opt ≈ floor((π / 4) * sqrt(N / M))
    """
    N = 2 ** n_qubits
    M = max(1, marked_count)
    if M >= N:
        return 0
    k_opt = math.floor((math.pi / 4) * math.sqrt(N / M))
    return max(1, k_opt)


def simulate_ideal(qc: QuantumCircuit, shots: int = 2048) -> Dict[str, int]:
    """
    Executes quantum circuit using ideal AerSimulator without noise.
    """
    simulator = AerSimulator()
    transpiled_qc = transpile(qc, simulator)
    result = simulator.run(transpiled_qc, shots=shots).result()
    return result.get_counts()


def sweep_iterations(
    n_qubits: int,
    target_states: List[str],
    shots: int = 2048
) -> List[Dict]:
    """
    Sweeps iteration counts from max(1, R_theory - 2) to R_theory + 2.
    Records success probability at each iteration step for single and multi-target configs.
    """
    marked_count = len(target_states)
    k_opt = calculate_optimal_iterations(n_qubits, marked_count)
    min_k = max(1, k_opt - 2)
    max_k = k_opt + 2
    
    sweep_results = []
    
    for k in range(min_k, max_k + 1):
        qc = build_grover_circuit(n_qubits, target_states, iterations=k)
        counts = simulate_ideal(qc, shots=shots)
        
        # Calculate success count across target states
        success_shots = sum(counts.get(t.zfill(n_qubits), 0) for t in target_states)
        success_prob = success_shots / shots
        
        sweep_results.append({
            "k": k,
            "is_optimal": (k == k_opt),
            "success_prob": success_prob,
            "counts": counts,
            "depth": qc.depth()
        })
        
    return sweep_results
