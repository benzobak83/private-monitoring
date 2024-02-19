import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'

export default defineConfig({
    plugins: [
        react(),
        ViteAliases({
            dir: 'src',
            prefix: '@',
            deep: false,
            depth: 0,
            adjustDuplicates: false,
        }),
    ],
    define: {
        'process.env': {},
    },
})
