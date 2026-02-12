import { describe, it, expect, vi, beforeEach } from 'vitest';
import { track } from '../../src/utils/tracking';

describe('track', () => {
  beforeEach(() => {
    vi.stubGlobal('umami', undefined);
  });

  it('should call umami.track when window.umami is defined', () => {
    const mockTrack = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('umami', { track: mockTrack });

    track('test-command', 'arg1', 'arg2');

    expect(mockTrack).toHaveBeenCalledWith('test-command', {
      args: 'arg1 arg2',
    });
  });

  it('should not throw when window.umami is undefined', () => {
    expect(() => track('test-command')).not.toThrow();
  });

  it('should handle empty args', () => {
    const mockTrack = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('umami', { track: mockTrack });

    track('test-command');

    expect(mockTrack).toHaveBeenCalledWith('test-command', {
      args: '',
    });
  });
});
