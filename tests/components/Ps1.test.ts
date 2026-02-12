import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { theme } from '../../src/stores/theme';
import type { Theme } from '../../src/interfaces/theme';
import Ps1 from '../../src/components/Ps1.svelte';

describe('Ps1', () => {
  beforeEach(() => {
    vi.stubGlobal('location', { hostname: 'test-host' });
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
  });

  it('should render hostname', () => {
    render(Ps1);
    expect(screen.getByText('test-host')).toBeInTheDocument();
  });

  it('should display prompt format', () => {
    render(Ps1);
    expect(screen.getByText('guest')).toBeInTheDocument();
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('test-host')).toBeInTheDocument();
    expect(screen.getByText(':~$')).toBeInTheDocument();
  });

  it('should apply theme colors', () => {
    const { container } = render(Ps1);
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
  });
});
