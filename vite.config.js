import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/navidad/', // Indica el subdirectorio
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})