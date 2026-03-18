import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Week-10/',
  plugins: [react()],
  build: {
    // Enable minification (terser is better for smaller sizes though slower, esbuild is default)
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true,      // Removes console.logs in production
        drop_debugger: true,     // Removes debugger statements
      },
    },
    // Chunk size warnings optimization
    chunkSizeWarningLimit: 1000, 
    // Rollup specific options for tree shaking and asset optimization
    rollupOptions: {
      output: {
        // Advanced manual chunking for optimization
        manualChunks(id) {
          if (id.includes('node_modules')) {
             if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
               return 'vendor-react'; // Separate massive libraries
             }
             return 'vendor'; // Other NPM modules go here
          }
        },
        // Asset optimization formatting rules
        assetFileNames: (assetInfo) => {
          let name = assetInfo?.name || 'asset';
          let extType = name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
});
