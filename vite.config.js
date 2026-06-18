import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic'
        })
    ],
    base: process.env.GITHUB_PAGES ? '/satori-lingo/' : '/',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist'
    }
});
