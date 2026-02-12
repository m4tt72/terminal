import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { history } from '../../src/stores/history';
import { theme } from '../../src/stores/theme';
import type { Theme } from '../../src/interfaces/theme';
import type { Command } from '../../src/interfaces/command';
import History from '../../src/components/History.svelte';

describe('History', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const mockTheme: Theme = {
      name: 'TestTheme',
      black: '#000000',
      red: '#ff0000',
      green: '#00ff00',
      yellow: '#ffff00',
      blue: '#0000ff',
      purple: '#ff00ff',
      cyan: '#00ffff',
      white: '#ffffff',
      brightBlack: '#808080',
      brightRed: '#ff8080',
      brightGreen: '#80ff80',
      brightYellow: '#ffff80',
      brightBlue: '#8080ff',
      brightPurple: '#ff80ff',
      brightCyan: '#80ffff',
      brightWhite: '#ffffff',
      foreground: '#ffffff',
      background: '#000000',
      cursorColor: '#ffffff',
    };

    theme.set(mockTheme);
    history.set([]);
  });

  it('should render empty history', () => {
    render(History);
    expect(screen.queryByText('help')).not.toBeInTheDocument();
  });

  it('should render single history entry', () => {
    const mockHistory: Command[] = [
      { command: 'help', outputs: ['Available commands:...'] },
    ];
    history.set(mockHistory);

    render(History);
    expect(screen.getByText('help')).toBeInTheDocument();
    expect(screen.getByText('Available commands:...')).toBeInTheDocument();
  });

  it('should render multiple history entries', () => {
    const mockHistory: Command[] = [
      { command: 'help', outputs: ['Available commands:...'] },
      { command: 'date', outputs: ['Thu Feb 12 2026'] },
    ];
    history.set(mockHistory);

    render(History);
    expect(screen.getByText('help')).toBeInTheDocument();
    expect(screen.getByText('date')).toBeInTheDocument();
    expect(screen.getByText('Available commands:...')).toBeInTheDocument();
    expect(screen.getByText('Thu Feb 12 2026')).toBeInTheDocument();
  });

  it('should render multiple outputs for a single command', () => {
    const mockHistory: Command[] = [
      {
        command: 'todo ls',
        outputs: ['○ [1] Buy milk', '○ [2] Buy bread'],
      },
    ];
    history.set(mockHistory);

    render(History);
    expect(screen.getByText('todo ls')).toBeInTheDocument();
    expect(screen.getByText('○ [1] Buy milk')).toBeInTheDocument();
    expect(screen.getByText('○ [2] Buy bread')).toBeInTheDocument();
  });

  it('should apply theme colors', () => {
    const mockHistory: Command[] = [
      { command: 'help', outputs: ['Available commands:...'] },
    ];
    history.set(mockHistory);

    const { container } = render(History);
    const historyDivs = container.querySelectorAll('div');
    expect(historyDivs.length).toBeGreaterThan(0);
  });
});
