import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages project sites are served from /<repository>/.
// The deploy workflow passes the real repository name via BASE_PATH.
const base = process.env.BASE_PATH ?? '/advanture-2-gh-pages/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
