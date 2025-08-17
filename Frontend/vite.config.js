import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailWindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailWindcss()],
})
