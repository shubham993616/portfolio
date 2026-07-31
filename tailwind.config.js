/** @type {import('tailwindcss').Config} */

/**
 * Every colour is driven by a CSS custom property declared in
 * `src/styles/globals.css`. That indirection is what makes the light/dark
 * theme toggle a single attribute flip on <html> rather than a class rewrite
 * across the whole component tree.
 *
 * Values are stored as space separated RGB channels so Tailwind's
 * `<alpha-value>` opacity modifiers (e.g. `bg-surface/60`) keep working.
 */
const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: withOpacity('--color-background'),
        'background-alt': withOpacity('--color-background-alt'),
        surface: withOpacity('--color-surface'),
        'surface-hover': withOpacity('--color-surface-hover'),
        border: withOpacity('--color-border'),
        'border-strong': withOpacity('--color-border-strong'),
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          soft: withOpacity('--color-accent-soft'),
          strong: withOpacity('--color-accent-strong'),
        },
        secondary: {
          DEFAULT: withOpacity('--color-secondary'),
          soft: withOpacity('--color-secondary-soft'),
        },
        content: {
          primary: withOpacity('--color-text-primary'),
          secondary: withOpacity('--color-text-secondary'),
          muted: withOpacity('--color-text-muted'),
        },
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        danger: withOpacity('--color-danger'),
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.06em' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.24), 0 8px 24px -12px rgb(0 0 0 / 0.5)',
        lifted: '0 24px 60px -24px rgb(0 0 0 / 0.65)',
        glow: '0 0 0 1px rgb(var(--color-accent) / 0.28), 0 12px 48px -12px rgb(var(--color-accent) / 0.42)',
        'glow-secondary':
          '0 0 0 1px rgb(var(--color-secondary) / 0.28), 0 12px 48px -12px rgb(var(--color-secondary) / 0.42)',
        inset: 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgb(var(--color-accent) / 0.16), transparent 70%)',
        'accent-sheen':
          'linear-gradient(135deg, rgb(var(--color-accent) / 1) 0%, rgb(var(--color-secondary) / 1) 100%)',
        'card-sheen':
          'linear-gradient(160deg, rgb(255 255 255 / 0.06) 0%, rgb(255 255 255 / 0) 42%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s var(--ease-premium) both',
        'gradient-pan': 'gradient-pan 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
      screens: {
        xs: '480px',
        '3xl': '1728px',
      },
    },
  },
  plugins: [],
}
