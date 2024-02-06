import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port : 3000,
    proxy: {
      '/api': {
           target: 'http://127.0.0.1:8000/',
           changeOrigin: true,
           secure: false,      
           ws: true,
           rewrite: (path) => path.replace(/^\/api/, ''),
       }
      }
  },

  plugins: [react()],
})