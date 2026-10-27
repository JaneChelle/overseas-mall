/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface-deep': '#05070C',
        'surface-base': '#0A0D12',
        'surface-raised': '#0F131C',
        'surface-elevated': '#161D2B',
        'surface-overlay': '#1E2636',
        'accent-primary': '#38BDF8',
        'accent-muted': '#6EE7B7',
      },
    },
  },
  plugins: [],
}

