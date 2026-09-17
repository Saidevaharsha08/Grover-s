/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FAFAF8',
          dark: '#0A0A0F',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#121218',
          hoverLight: '#F3F3F0',
          hoverDark: '#1A1A24',
        },
        ink: {
          light: '#121316',
          dark: '#F3F4F6',
          mutedLight: '#64748B',
          mutedDark: '#94A3B8',
        },
        quantum: {
          theoretical: '#6D5EF5', // Subtle purple/violet
          theoreticalLight: '#8B7BFF',
          simulated: '#0E8F8F',   // Cool teal/cyan
          simulatedLight: '#2DD4BF',
          marked: '#D97706',      // Warm amber/gold for marked states
          markedLight: '#F59E0B',
          borderLight: '#E2E8F0',
          borderDark: '#27273A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
