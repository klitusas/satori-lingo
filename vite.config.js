import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
    plugins: [
        react({
            jsxRuntime: 'automatic'
        })
    ],
    base: command === 'build' ? '/satori-lingo/' : '/',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist'
    }
}));
