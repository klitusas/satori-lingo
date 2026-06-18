/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                japandi: {
                    cream: '#FAF9F6',
                    paper: '#F5F3EF',
                    border: '#E3DFD5',
                    charcoal: '#2D2D2D',
                    olive: '#4F5D4E',
                    oliveHover: '#3D493D',
                    terracotta: '#C28C7E',
                    muted: '#7A756B'
                }
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                serif: ['Playfair Display', 'serif']
            }
        }
    },
    plugins: []
};
