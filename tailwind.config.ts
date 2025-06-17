import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				chess: {
					light: 'hsl(var(--chess-light))',
					dark: 'hsl(var(--chess-dark))',
					selected: 'hsl(var(--chess-selected))',
					highlight: 'hsl(var(--chess-highlight))',
				}
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
				'chess-piece-float': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'50%': { transform: 'translateY(-2px) scale(1.05)' }
				},
				'chess-board-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'piece-capture': {
					'0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.5' },
					'100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'chess-piece-float': 'chess-piece-float 2s ease-in-out infinite',
				'chess-board-glow': 'chess-board-glow 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
				'piece-capture': 'piece-capture 0.6s ease-in-out'
			},
			backgroundImage: {
				'chess-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'board-gradient': 'linear-gradient(45deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
				'piece-glow': 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;