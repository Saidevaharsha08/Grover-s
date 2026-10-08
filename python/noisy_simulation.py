"""
Noisy Quantum Circuit Simulation Module
Simulates Grover's circuits under realistic physical noise models (thermal relaxation, gate depolarization, and readout errors).
"""

from typing import Dict, Optional
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import (
    NoiseModel,
    depolarizing_error,
    thermal_relaxation_error,
    ReadoutError
)


def create_realistic_noise_model(
    p_single_gate: float = 0.0015,
    p_two_gate: float = 0.018,
    p_readout: float = 0.035
) -> NoiseModel:
    """
    Constructs a realistic physical noise model for quantum backend simulation.
    - Single-qubit gate depolarization error
    - Two-qubit (CX/CZ) gate depolarization error
    - Asymmetric measurement readout error
    - Thermal relaxation (T1 / T2) decoherence
    """
    noise_model = NoiseModel()
    
    # 1. Depolarizing error for 1-qubit gates (h, x, rz)
    err_single = depolarizing_error(p_single_gate, 1)
    noise_model.add_all_qubit_quantum_error(err_single, ['h', 'x', 'rz', 'sx'])
    
    # 2. Depolarizing error for 2-qubit gates (cz, cx)
    err_two = depolarizing_error(p_two_gate, 2)
    noise_model.add_all_qubit_quantum_error(err_two, ['cz', 'cx'])
    
    # 3. Readout error (Measurement flipping probability)
    readout_matrix = [
        [1.0 - p_readout, p_readout],
        [p_readout * 0.8, 1.0 - p_readout * 0.8]
    ]
    readout_err = ReadoutError(readout_matrix)
    noise_model.add_all_qubit_readout_error(readout_err)
    
    # 4. Thermal relaxation error (T1 = 50µs, T2 = 70µs, gate time = 50ns)
    t1, t2, gate_time = 50e-6, 70e-6, 50e-9
    err_thermal = thermal_relaxation_error(t1, t2, gate_time)
    noise_model.add_all_qubit_quantum_error(err_thermal, ['id', 'h', 'x'])
    
    return noise_model


def get_backend_noise_model() -> NoiseModel:
    """
    Attempts to pull a real IBM backend noise model if available,
    falling back to the calibrated realistic noise model.
    """
    try:
        from qiskit_ibm_runtime.fake_provider import FakeManilaV2
        fake_backend = FakeManilaV2()
        return NoiseModel.from_backend(fake_backend)
    except Exception:
        return create_realistic_noise_model()


def simulate_noisy(
    qc: QuantumCircuit,
    noise_model: Optional[NoiseModel] = None,
    shots: int = 2048
) -> Dict[str, int]:
    """
    Executes quantum circuit using AerSimulator configured with the physical noise model.
    """
    if noise_model is None:
        noise_model = create_realistic_noise_model()
        
    simulator = AerSimulator(noise_model=noise_model)
    transpiled_qc = transpile(qc, simulator)
    result = simulator.run(transpiled_qc, shots=shots).result()
    return result.get_counts()
