import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ['var(--font-title)', 'serif'],
                body: ['var(--font-body)', 'sans-serif'],
            },
            colors: {
                primary: '#003135',
                secondary: '#0FA4AF',
                'low-green': '#AEDDE5',
            },
        },
    },
    plugins: [],
};

export default config;
