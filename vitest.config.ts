import { resolve } from 'path';
import * as VitestConfig from 'vitest/config';
import react from "@vitejs/plugin-react";

export default VitestConfig.defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: ['app/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  plugins: [react()],
});
