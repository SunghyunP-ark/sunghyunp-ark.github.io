import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer':       ['framer-motion'],
          'markdown':     ['react-markdown', 'remark-gfm', 'remark-math', 'rehype-katex'],
          'katex':        ['katex'],
          'codemirror':   ['@uiw/react-codemirror', '@codemirror/lang-markdown', '@codemirror/theme-one-dark'],
          'lightbox':     ['yet-another-react-lightbox'],
        },
      },
    },
  },
})
