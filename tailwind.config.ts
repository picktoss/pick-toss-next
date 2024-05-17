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
        h1: [
          '36px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'h2-bold': [
          '32px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'h2-medium': [
          '32px',
          {
            lineHeight: 'normal',
            fontWeight: '500',
            letterSpacing: '0.02em',
          },
        ],
        'h3-bold': [
          '24px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'h3-medium': [
          '24px',
          {
            lineHeight: 'normal',
            fontWeight: '500',
            letterSpacing: '0.02em',
          },
        ],
        'h4-bold': [
          '20px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        button: [
          '16px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'body1-bold': [
          '16px',
          {
            lineHeight: '120%',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'body1-bold-eng': [
          '16px',
          {
            lineHeight: '120%',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'body1-medium': [
          '16px',
          {
            lineHeight: '120%',
            fontWeight: '500',
            letterSpacing: '0.02em',
          },
        ],
        'body2-bold': [
          '14px',
          {
            lineHeight: '120%',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'body2-medium': [
          '14px',
          {
            lineHeight: '120%',
            fontWeight: '500',
            letterSpacing: '0.02em',
          },
        ],
        'body2-regular': [
          '14px',
          {
            lineHeight: '120%',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
          },
        ],
        'body2-regular-eng': [
          '14px',
          {
            lineHeight: 'normal',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
          },
        ],
        'text-medium': [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: '500',
            letterSpacing: '0.02em',
          },
        ],
        'text-regular': [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
          },
        ],
        'small1-bold': [
          '12px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'small1-regular': [
          '12px',
          {
            lineHeight: 'normal',
            fontWeight: 'normal',
            letterSpacing: '0.02em',
          },
        ],
        tag: [
          '10px',
          {
            lineHeight: 'normal',
            fontWeight: 'bold',
            letterSpacing: '0.02em',
          },
        ],
        'tag-eng': [
          '10px',
          {
            lineHeight: '150%',
            fontWeight: 'normal',
            letterSpacing: '0.03em',
          },
        ],
      },
      colors: {
        white: '#FFFFFF',
        gray: {
          '01': '#F6FAFD',
          '02': '#EFF1F3',
          '03': '',
          '04': '#D2D6DB',
          '05': '',
          '06': '#A2A6AB',
          '07': '#797D81',
          '08': '#4B4F54',
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
          '01': '#F0F4FF',
          '02': '#D7E2FF',
          '03': '#BCCFFF',
          '04': '#95BOF8',
          '05': '#7095F8',
          '06': '#577CFF',
        },

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
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config
