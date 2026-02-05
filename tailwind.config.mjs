/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Dark mode colors
          dark: {
            bg: '#0a0f1a',
            surface: '#111827',
            text: '#f8fafc',
            muted: '#94a3b8',
          },
          // Light mode colors (sepia-tinted)
          light: {
            bg: '#faf8f5',
            surface: '#f5f3ef',
            text: '#1e293b',
            muted: '#64748b',
          },
          // Accent colors
          accent: {
            primary: '#3b82f6',
            'primary-dark': '#1e40af',
            secondary: '#14b8a6',
            'secondary-dark': '#0d9488',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }