/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(blue|emerald|cyan|teal|green|gray|pink|amber|orange)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'via', 'to', 'from'],
    },
    {
      pattern: /text-(blue|emerald|cyan|teal|green|gray|pink|amber|orange)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover'],
    },
    {
      pattern: /ring-(blue|emerald|cyan|teal|green|gray|pink|amber|orange)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Glass morphism effects
    'backdrop-blur-md',
    'backdrop-blur-sm',
    'backdrop-blur-lg',
    'bg-opacity-30',
    'bg-opacity-50',
    'bg-opacity-70',
    // Gradient patterns
    'via-pink-500',
    'via-blue-500',
    'to-purple-500',
    'to-teal-500',
  ],
  theme: {
    extend: {
      dropShadow: {
        'neon': '0 0 10px currentColor',
      },
    },
  },
  plugins: [],
}