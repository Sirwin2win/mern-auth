import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Here is for connecting to server endpoint
  server: {
    port: 3000,
    //The proxy means, whenever we go to anything that has
    // slash api, that it should target backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin:true
      }
    }
  }
})
