import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commands } from '../../src/utils/commands';
import { history } from '../../src/stores/history';
import { theme } from '../../src/stores/theme';

describe('commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('location', { hostname: 'test-host' });
  });

  describe('help', () => {
    it('should return available commands by category', () => {
      const result = commands.help([]);
      expect(result).toContain('Available commands:');
      expect(result).toContain('System:');
      expect(result).toContain('Productivity:');
      expect(result).toContain('Customization:');
      expect(result).toContain('Network:');
      expect(result).toContain('Contact:');
      expect(result).toContain('Fun:');
    });

    it('should list commands under each category', () => {
      const result = commands.help([]);
      expect(result).toContain('help');
      expect(result).toContain('clear');
      expect(result).toContain('todo');
      expect(result).toContain('theme');
      expect(result).toContain('hostname');
    });
  });

  describe('hostname', () => {
    it('should return current hostname', () => {
      const result = commands.hostname([]);
      expect(result).toBe('localhost');
    });
  });

  describe('whoami', () => {
    it('should return guest', () => {
      const result = commands.whoami([]);
      expect(result).toBe('guest');
    });
  });

  describe('date', () => {
    it('should return formatted date', () => {
      const result = commands.date([]);
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });

  describe('editor commands', () => {
    it('vi should suggest emacs', () => {
      const result = commands.vi([]);
      expect(result).toBe('why use vi? try \'emacs\'');
    });

    it('vim should suggest emacs', () => {
      const result = commands.vim([]);
      expect(result).toBe('why use vim? try \'emacs\'');
    });

    it('emacs should suggest vim', () => {
      const result = commands.emacs([]);
      expect(result).toBe('why use emacs? try \'vim\'');
    });
  });

  describe('echo', () => {
    it('should echo arguments', () => {
      const result = commands.echo(['hello', 'world']);
      expect(result).toBe('hello world');
    });

    it('should handle single argument', () => {
      const result = commands.echo(['test']);
      expect(result).toBe('test');
    });

    it('should handle no arguments', () => {
      const result = commands.echo([]);
      expect(result).toBe('');
    });
  });

  describe('sudo', () => {
    it('should open YouTube and deny permission', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.sudo(['ls']);

      expect(mockOpen).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      );
      expect(result).toContain('Permission denied');
      expect(result).toContain('ls');
    });
  });

  describe('theme', () => {
    it('should return usage when no args provided', () => {
      const result = commands.theme([]);
      expect(result).toContain('Usage: theme [args]');
    });

    it('should list themes with ls command', () => {
      const result = commands.theme(['ls']);
      expect(result).toContain(',');
      expect(result).toContain('github.com');
    });

    it('should set theme with set command', () => {
      const result = commands.theme(['set', 'gruvboxdark']);
      expect(result).toContain('Theme set to gruvboxdark');
    });

    it('should return error for unknown theme', () => {
      const result = commands.theme(['set', 'unknown']);
      expect(result).toContain('not found');
    });

    it('should return usage for invalid subcommand', () => {
      const result = commands.theme(['invalid']);
      expect(result).toContain('Usage: theme [args]');
    });
  });

  describe('repo', () => {
    it('should open repository URL', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.repo([]);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('github.com'),
        '_blank',
      );
      expect(result).toContain('Opening repository...');
    });
  });

  describe('email', () => {
    it('should open mailto link', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.email([]);

      expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining('mailto:'));
      expect(result).toContain('Opening mailto:');
    });
  });

  describe('donate', () => {
    it('should open donation URL', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.donate([]);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('paypal'),
        '_blank',
      );
      expect(result).toContain('Opening donation url...');
    });
  });

  describe('clear', () => {
    it('should clear history', () => {
      const setSpy = vi.spyOn(history, 'set');

      const result = commands.clear([]);

      expect(setSpy).toHaveBeenCalledWith([]);
      expect(result).toBe('');
    });
  });

  describe('weather', async () => {
    it('should return usage when no city provided', async () => {
      const result = await commands.weather([]);
      expect(result).toContain('Usage: weather [city]');
    });

    it('should fetch weather for city', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve('Weather report'),
      });

      const result = await commands.weather(['Brussels']);
      expect(result).toBe('Weather report');
    });
  });

  describe('exit', () => {
    it('should return close tab message', () => {
      const result = commands.exit([]);
      expect(result).toBe('Please close the tab to exit.');
    });
  });

  describe('curl', async () => {
    it('should return error when no URL provided', async () => {
      const result = await commands.curl([]);
      expect(result).toContain('no URL provided');
    });

    it('should fetch URL content', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve('<html>content</html>'),
      });

      const result = await commands.curl(['https://example.com']);
      expect(result).toBe('<html>content</html>');
    });

    it('should handle fetch errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await commands.curl(['https://example.com']);
      expect(result).toContain('could not fetch URL');
      expect(result).toContain('Network error');
    });
  });

  describe('banner', () => {
    it('should display ASCII art banner with version', () => {
      const result = commands.banner([]);
      expect(result).toContain('█');
      expect(result).toContain('v');
    });
  });

  describe('todo', () => {
    it('should return usage when no subcommand provided', () => {
      const result = commands.todo([]);
      expect(result).toContain('Usage: todo [command]');
    });

    it('should add todo with add subcommand', () => {
      const result = commands.todo(['add', 'Buy groceries']);
      expect(result).toContain('✓ Added todo');
      expect(result).toContain('Buy groceries');
    });

    it('should return error when add has no text', () => {
      const result = commands.todo(['add']);
      expect(result).toContain('Error: Please provide todo text');
    });

    it('should list todos with ls subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['ls']);
      expect(result).toContain('Test todo');
    });

    it('should list pending todos with filter', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['ls', 'pending']);
      expect(result).toContain('Test todo');
    });

    it('should return error for invalid filter', () => {
      const result = commands.todo(['ls', 'invalid']);
      expect(result).toContain('Error: Invalid filter');
    });

    it('should complete todo with done subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['done', '1']);
      expect(result).toContain('✓ Completed todo');
    });

    it('should return error for non-numeric ID', () => {
      const result = commands.todo(['done', 'abc']);
      expect(result).toContain('Error: Please provide a valid todo ID');
    });

    it('should remove todo with rm subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['rm', '1']);
      expect(result).toContain('✗ Removed todo');
    });

    it('should clear all todos', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['clear']);
      expect(result).toContain('Cleared');
    });

    it('should clear completed todos', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      commands.todo(['done', '1']);
      const result = commands.todo(['clear', 'completed']);
      expect(result).toContain('Cleared');
    });

    it('should show statistics', () => {
      const result = commands.todo(['stats']);
      expect(result).toContain('📊 Todo Statistics');
    });

  it('should return error for unknown subcommand', () => {
    const result = commands.todo(['unknown']);
    expect(result).toContain('Unknown todo command');
  });
});
});
