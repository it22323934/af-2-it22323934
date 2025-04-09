import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This is the fix for the tailwindcss/version.js error
      'tailwindcss/version': 'tailwindcss/package.json'
    }
  }
});