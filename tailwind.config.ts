import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arctic-powder':        'var(--color-arctic-powder)',
        'mystic-mint':          'var(--color-mystic-mint)',
        'forsythia':            'var(--color-forsythia)',
        'deep-saffron':         'var(--color-deep-saffron)',
        'nocturnal-expedition': 'var(--color-nocturnal-expedition)',
        'oceanic-noir':         'var(--color-oceanic-noir)',
        'brand':                'var(--color-brand)',
        'brand-deep':           'var(--color-brand-deep)',
        'accent':               'var(--color-accent)',
        'accent-warm':          'var(--color-accent-warm)',
        'surface':              'var(--color-surface)',
        'surface-alt':          'var(--color-surface-alt)',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      transitionTimingFunction: {
        'ease-out-premium':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out-premium':'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        'micro':      '175ms',
        'structural': '350ms',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fade-up 350ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-down': 'fade-down 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':   'fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
