import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      fontSize: {
        'page-title': [
          '32px',
          {
            fontWeight: 'bold',
            lineHeight: '-2%',
          },
        ],
        'folder-name': [
          '20px',
          {
            fontWeight: 'medium',
            lineHeight: '-2%',
          },
        ],
        button: [
          '16px',
          {
            fontWeight: 'bold',
            lineHeight: '0%',
          },
        ],
        'gnb-name': [
          '14px',
          {
            fontWeight: 'medium',
            lineHeight: '-2%',
          },
        ],
      },
      colors: {
        gray: {
          '01': '#F6FAFD',
          '02': '#EFF1F3',
          '03': '',
          '04': '#D2D6DB',
          '05': '#A2A6AB',
          '06': '#797D81',
          '07': '#4B4F54',
          '08': '',
          '09': '#292B2C',
          '10': '#1D1E1F',
        },
        orange: {
          '01': '#FFECD0',
          '02': '#FFE1AC',
          '03': '#FFD180',
          '04': '#FFAB40',
          '05': '#FF9100',
          '06': '#FB7E20',
        },
        notice: {
          red: '#F66444',
          green: '63CF75',
        },
        blue: {
          '01': '#FOF4FF',
          '02': '#D7E2FF',
          '03': '#BCCFFF',
          '04': '#95BOF8',
          '05': '#7095F8',
          '06': '#577CFF',
        },
        white: '#FFFFFF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        modal: '0px 4px 12px 0px #00000040',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
