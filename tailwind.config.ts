import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				'primary-foreground': 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				'secondary-foreground': 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				'destructive-foreground': 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				'muted-foreground': 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				'accent-foreground': 'hsl(var(--accent-foreground))',
				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',
				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',
				accounting: {
					50: '#f0f8ff',
					100: '#e0f0ff',
					200: '#c0e0ff',
					300: '#80c0ff',
					400: '#4090ff',
					500: '#2070f0',
					600: '#1060e0',
					700: '#0050c0',
					800: '#004090',
					900: '#003070',
					950: '#001840',
				},
				dm: {
					50: '#fdf6f9',
					100: '#f9ecf0',
					200: '#f2d0d9',
					300: '#e5a6b7',
					400: '#d6728e',
					500: '#bd4365',
					600: '#a22e4f',
					700: '#7a1e37',
					800: '#5d1a2c',
					900: '#3c0f1e',
					950: '#350618',
				},
				gold: {
					50: '#fefbe8',
					100: '#fff8c2',
					200: '#ffee89',
					300: '#fee256',
					400: '#fecf29',
					500: '#f4b606',
					600: '#dc8c03',
					700: '#b66307',
					800: '#934b10',
					900: '#793c13',
					950: '#461e03',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-up': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-up': 'fade-up 0.4s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
	corePlugins: {
		preflight: true,
	},
	purge: {
		enabled: true,
		content: [
			"./src/**/*.{js,ts,jsx,tsx}",
		],
		options: {
			safelist: ['dark'],
		},
	},
} satisfies Config;

export default config;
