import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'open', {
  value: vi.fn(),
  writable: true,
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
