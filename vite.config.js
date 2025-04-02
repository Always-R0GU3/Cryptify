import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(new URL('./src', import.meta.url).pathname), // Resolve @ to the src folder
    },
  },
})



 //     "@": path.resolve(__dirname, "./src"),

