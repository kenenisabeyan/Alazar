import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  esbuild: {
    sourcemap: false,
  },

  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false,
    },
  },

  build: {
    // Raise the warning threshold so advisory doesn't appear
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split heavy vendor libs into separate cacheable chunks
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
  },
});
