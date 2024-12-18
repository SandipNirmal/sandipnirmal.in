import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%'
					}
				}
			}
		}
	},

	plugins: [typography]
} satisfies Config;
