import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The docs always use the library source, so changes in ../src show up instantly
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'reactjs-otp-input': fileURLToPath(new URL('../src/index.tsx', import.meta.url)),
    },
  },
});
