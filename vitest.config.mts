import dynamic from 'next/dynamic';

import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
});
