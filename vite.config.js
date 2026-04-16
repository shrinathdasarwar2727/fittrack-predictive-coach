import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base makes assets resolve correctly on GitHub Pages project URLs.
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/recharts')) return 'vendor-recharts';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/styled-components')) return 'vendor-styled';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'vendor-react';
        }
      }
    }
  }
});
