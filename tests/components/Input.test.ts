import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { history } from '../../src/stores/history';
import { theme } from '../../src/stores/theme';
import type { Theme } from '../../src/interfaces/theme';
import Input from '../../src/components/Input.svelte';

describe('Input', () => {
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

  it('should render input field', () => {
    render(Input);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should have correct aria-label', () => {
    render(Input);
    const input = screen.getByLabelText('Command input');
    expect(input).toBeInTheDocument();
  });

  it('should apply theme foreground color', () => {
    const { container } = render(Input);
    const input = container.querySelector('input');
    expect(input).toHaveStyle({ color: '#ffffff' });
  });

  it('should execute command on Enter key', async () => {
    render(Input);
    const input = screen.getByLabelText('Command input');
    await userEvent.type(input, 'echo hello');
    await fireEvent.keyDown(input, { key: 'Enter' });

    let currentHistory: any[] = [];
    history.subscribe((value) => {
      currentHistory = value;
    })();

    expect(currentHistory).toHaveLength(1);
    expect(currentHistory[0].command).toBe('echo hello');
    expect(input).toHaveValue('');
  });

  it('should navigate history with ArrowUp', async () => {
    history.set([
      { command: 'first', outputs: ['output'] },
      { command: 'second', outputs: ['output'] },
    ]);

    render(Input);
    const input = screen.getByLabelText('Command input') as HTMLInputElement;
    await fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input.value).toBe('second');
  });

  it('should navigate history with ArrowDown', async () => {
    history.set([{ command: 'first', outputs: ['output'] }]);

    render(Input);
    const input = screen.getByLabelText('Command input') as HTMLInputElement;
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('first');

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.value).toBe('');
  });

  it('should autocomplete on Tab key', async () => {
    render(Input);
    const input = screen.getByLabelText('Command input') as HTMLInputElement;
    await userEvent.type(input, 'hel');
    await fireEvent.keyDown(input, { key: 'Tab' });

    expect(input.value).toBe('help');
  });

  it('should clear history on Ctrl+L', async () => {
    history.set([{ command: 'test', outputs: ['output'] }]);

    render(Input);
    const input = screen.getByLabelText('Command input');
    await fireEvent.keyDown(input, { key: 'l', ctrlKey: true });

    let currentHistory: any[] = [];
    history.subscribe((value) => {
      currentHistory = value;
    })();

    expect(currentHistory).toHaveLength(0);
  });

  it('should focus on click anywhere in window', async () => {
    render(Input);
    const input = screen.getByLabelText('Command input') as HTMLInputElement;
    input.blur();

    await fireEvent.click(document.body);
    expect(document.activeElement).toBe(input);
  });

  it('should have correct aria-label', () => {
    render(Input);
    const input = screen.getByLabelText('Command input');
    expect(input).toBeInTheDocument();
  });

  it('should not execute clear command in history', async () => {
    render(Input);
    const input = screen.getByLabelText('Command input') as HTMLInputElement;
    await userEvent.type(input, 'clear');
    await fireEvent.keyDown(input, { key: 'Enter' });

    let currentHistory: any[] = [];
    history.subscribe((value) => {
      currentHistory = value;
    })();

    expect(currentHistory).toHaveLength(0);
  });
});
