import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { theme } from '../../src/stores/theme';
import type { Theme } from '../../src/interfaces/theme';
import App from '../../src/App.svelte';

describe('App', () => {
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
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_TRACKING_ENABLED: 'false',
          VITE_TRACKING_SITE_ID: '',
          VITE_TRACKING_URL: '',
        },
      },
    });
  });

  it('should render main container', () => {
    const { container } = render(App);
    const main = container.querySelector('main');
    expect(main).not.toBeNull();
  });

  it('should apply theme styles', () => {
    const { container } = render(App);
    const main = container.querySelector('main');
    expect(main).toHaveStyle({ 'background-color': '#000000' });
    expect(main).toHaveStyle({ color: '#ffffff' });
  });

  it('should apply border color from theme', () => {
    const { container } = render(App);
    const main = container.querySelector('main');
    expect(main).toHaveStyle({ 'border-color': '#00ff00' });
  });

  it('should render input field', () => {
    render(App);
    const input = document.getElementById('command-input');
    expect(input).toBeInTheDocument();
  });

  it('should not render tracking script when disabled', () => {
    const { container } = render(App);
    const trackingScript = container.querySelector('head script[data-website-id]');
    expect(trackingScript).toBeNull();
  });
});
