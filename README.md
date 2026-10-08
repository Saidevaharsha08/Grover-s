# ⚛️ GroverLab — Quantum Search Algorithm Simulation & Benchmarking Platform

> **GroverLab** is an interactive, full-stack quantum computing laboratory and research environment designed to simulate, analyze, and benchmark **Grover's Quantum Search Algorithm** across 2, 3, and 4-qubit quantum architectures.

---

## 🌟 Key Features

- 🔬 **Interactive Quantum Workbench**: Configure quantum systems ($n \in \{2, 3, 4\}$ qubits, $N \in \{4, 8, 16\}$ search space states), toggle multiple target states, set Grover iterations $k$, and select measurement shot counts.
- 📐 **LaTeX Mathematical Typesetting**: Built-in **KaTeX** integration rendering formulas for theoretical probability curves, optimal iteration counts, and state vector bra-ket notations ($|s_k\rangle$, $|w\rangle$, $\text{Span}(|w^\perp\rangle, |w\rangle)$).
- 📊 **Streamlined Monte Carlo Results**: Empirical shot distribution bar charts, state vector fidelity scores, and top measured state identification.
- 🌀 **2D Geometric Subspace Rotation**: Real-time visual representation of quantum state vector rotation towards target subspace $|w\rangle$ in two-dimensional Hilbert space.
- 📈 **State Vector Amplitude Trace**: Step-by-step trace of phase flip and inversion about mean amplitude $\mu$ across gate operations.
- ⚡ **Quantum Benchmark Suite**: Comparative analysis of quantum speedup $\mathcal{O}(\sqrt{N})$ versus classical unstructured search $\mathcal{O}(N)$.
- 🐍 **Qiskit 1.x Code Exporter**: Dynamically generates ready-to-run Python code for Qiskit Aer simulators and quantum hardware execution.

---

## 🧮 Mathematical Foundations

Grover's algorithm achieves a quadratic quantum speedup for searching unstructured data:

1. **Uniform Superposition Initialization**:
   $$|s\rangle = H^{\otimes n} |0\rangle^{\otimes n} = \frac{1}{\sqrt{N}} \sum_{x=0}^{N-1} |x\rangle$$

2. **Phase Oracle Operator ($U_w$)**:
   $$U_w |x\rangle = \begin{cases} -|x\rangle & \text{if } x \text{ is a marked target state} \\ |x\rangle & \text{if } x \text{ is an unmarked state} \end{cases}$$

3. **Grover Diffuser Operator ($U_s$)**:
   $$U_s = 2|s\rangle\langle s| - I$$

4. **Optimal Iterations ($k_{\text{opt}}$)**:
   $$k_{\text{opt}} \approx \left\lfloor \frac{\pi}{4} \sqrt{\frac{N}{M}} \right\rfloor$$

5. **Success Probability ($P(k)$)**:
   $$P(k) = \sin^2\left(\frac{(2k+1)\theta}{2}\right) \quad \text{where} \quad \theta = 2 \arcsin\left(\sqrt{\frac{M}{N}}\right)$$

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Quantum Design System
- **Visualization**: Recharts + SVG Geometric Rotation Engine
- **Math Typesetting**: KaTeX (LaTeX Rendering)
- **Icons & UI**: Lucide React
- **Code Generation**: Qiskit 1.x Python Exporter

---

## 🚀 Getting Started & How to Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/Saidevaharsha08/Grover-s.git
cd "Grover's"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
# Standard command
npm run dev

# Windows PowerShell (if script execution policy is restricted)
cmd /c npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

### 4. Build for Production
To test or output the optimized production bundle:
```bash
# Standard build
npm run build

# Windows CMD
cmd /c npm run build
```

---

## 📂 Project Structure

```
Grover's/
├── public/                  # Static web assets & icons
├── src/
│   ├── components/          # Modular React components
│   │   ├── benchmark/       # Benchmark suite & scaling tables
│   │   ├── code/            # Qiskit code export panel
│   │   ├── common/          # MathView (KaTeX renderer) & shared UI
│   │   ├── experiment/      # Workbench controls & target state grid
│   │   ├── hero/            # Hero landing section
│   │   ├── history/         # Experiment run history table
│   │   ├── layout/          # Navbar & Footer
│   │   ├── methodology/     # Theoretical quantum documentation
│   │   ├── overview/        # Research overview section
│   │   ├── results/         # Simulation dashboard & theoretical cards
│   │   └── visualization/   # Probability, Amplitude & 2D Rotation charts
│   ├── context/             # Experiment state context & Monte Carlo simulator
│   ├── lib/                 # Grover algorithm math engine & Qiskit code generator
│   ├── App.tsx              # Main application layout
│   └── index.css            # Global CSS & KaTeX styling
├── index.html               # Entry HTML template
├── package.json             # Node dependencies & build scripts
└── vite.config.ts           # Vite configuration
```

---

## 📜 License

This project is licensed under the MIT License — free for academic, research, and educational use.
