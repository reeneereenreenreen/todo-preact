// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'], // ← Make sure this path exists
    globals: true, // ← AUTO-IMPORTS describe, it, expect, vi
  },
});
