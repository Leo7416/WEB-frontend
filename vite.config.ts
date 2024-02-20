import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Vite PWA Project',
        short_name: 'Vite PWA Project',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/WEB-frontend/pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: '/WEB-frontend/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/WEB-frontend/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/WEB-frontend/maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    })
  ],
  server: { port: 3000 },
  base: '/WEB-frontend',
})
