import { describe, it, expect, beforeEach, vi } from 'vitest';
import { theme } from '../../src/stores/theme';
import { history } from '../../src/stores/history';
import type { Theme } from '../../src/interfaces/theme';
import type { Command } from '../../src/interfaces/command';

describe('theme store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
  });

  it('should save theme to localStorage when updated', () => {
    const newTheme: Theme = {
      name: 'NewTheme',
      black: '#111111',
      red: '#ff1111',
      green: '#11ff11',
      yellow: '#ffff11',
      blue: '#1111ff',
      purple: '#ff11ff',
      cyan: '#11ffff',
      white: '#ffffff',
      brightBlack: '#818181',
      brightRed: '#ff8181',
      brightGreen: '#81ff81',
      brightYellow: '#ffff81',
      brightBlue: '#8181ff',
      brightPurple: '#ff81ff',
      brightCyan: '#81ffff',
      brightWhite: '#ffffff',
      foreground: '#ffffff',
      background: '#111111',
      cursorColor: '#ffffff',
    };

    theme.set(newTheme);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'colorscheme',
      JSON.stringify(newTheme),
    );
  });
});

describe('history store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
  });

  it('should save history to localStorage when updated', () => {
    const newEntry: Command = { command: 'date', outputs: ['Thu Feb 12 2026'] };
    history.set([newEntry]);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'history',
      JSON.stringify([newEntry]),
    );
  });
});
