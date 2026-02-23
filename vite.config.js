import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chai-and-code/',  // GitHub Pages base path - change if your repo name is different
  server: {
    port: 3000,
    open: true
  }
})
