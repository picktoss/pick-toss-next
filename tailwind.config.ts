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
        suit: ['var(--font-suit)'],
        'dm-sans': ['var(--font-dm-sans'],
        'dm-suit': ['var(--font-dm-sans)', 'var(--font-suit)'],
      },
      fontSize: {
        hero: [
          '36px',
          {
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '-0.02em',
          },
        ],
        title1: [
          '30px',
          {
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '-0.02em',
          },
        ],
        title2: [
          '24px',
          {
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '-0.02em',
          },
        ],
        title3: [
          '20px',
          {
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '-0.02em',
          },
        ],
        'subtitle1-bold': [
          '18px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'subtitle2-bold': [
          '16px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'subtitle2-medium': [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'text1-bold': [
          '14px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'text1-medium': [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'text1-regular': [
          '14px',
          {
            fontWeight: 'normal',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'text2-bold': [
          '12px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'text2-medium': [
          '12px',
          {
            fontWeight: '500',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'caption-bold': [
          '10px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'caption-medium': [
          '10px',
          {
            fontWeight: '500',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
          },
        ],
        'button-1': [
          '18px',
          {
            fontWeight: '600',
            lineHeight: 'normal',
            letterSpacing: '-0.02em',
          },
        ],
        'button-2': [
          '16px',
          {
            fontWeight: '600',
            lineHeight: 'normal',
            letterSpacing: '-0.02em',
          },
        ],
        'button-3': [
          '14px',
          {
            fontWeight: '600',
            lineHeight: 'normal',
            letterSpacing: '-0.02em',
          },
        ],
        'button-4': [
          '14px',
          {
            fontWeight: '500',
            lineHeight: 'normal',
            letterSpacing: '-0.02em',
          },
        ],
        'button-5': [
          '12px',
          {
            fontWeight: '600',
            lineHeight: 'normal',
            letterSpacing: '-0.02em',
          },
        ],
        question: [
          '20px',
          {
            fontWeight: 'bold',
            lineHeight: '150%',
            letterSpacing: '-0.02em',
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
          green: '#63CF75',
        },
        blue: {
          '01': '#F0F4FF',
          '02': '#D7E2FF',
          '03': '#BCCFFF',
          '04': '#95B0F8',
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
        'custom-shadow': '2px 2.5px 12.5px rgba(93, 99, 110, 0.15)',
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
      backgroundImage: {
        'orange-gradient': 'linear-gradient(to bottom, #FFFFFF 0%, #FFF7EA 40%, #FFFFFF 60%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
} satisfies Config

export default config
