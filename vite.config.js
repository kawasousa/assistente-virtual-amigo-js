import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/home/index.html'),
        error: resolve(__dirname, 'src/pages/error/index.html'),
      },
    },
  },
});