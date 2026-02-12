import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoManager } from '../../src/utils/todo';

describe('TodoManager', () => {
  let todoManager: TodoManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    todoManager = new TodoManager();
  });

  describe('add', () => {
    it('should add a new todo', () => {
      const result = todoManager.add('Buy milk');
      expect(result).toBe('✓ Added todo #1: Buy milk');
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should increment todo ID', () => {
      todoManager.add('First todo');
      todoManager.add('Second todo');
      const result = todoManager.add('Third todo');
      expect(result).toBe('✓ Added todo #3: Third todo');
    });

    it('should save todos to localStorage', () => {
      todoManager.add('Test todo');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'terminal-todos',
        expect.stringContaining('Test todo'),
      );
    });
  });

  describe('list', () => {
    beforeEach(() => {
      todoManager.add('First todo');
      todoManager.add('Second todo');
    });

    it('should list all todos', () => {
      const result = todoManager.list();
      expect(result).toContain('[1]');
      expect(result).toContain('[2]');
      expect(result).toContain('First todo');
      expect(result).toContain('Second todo');
      expect(result).toContain('Total: 2');
    });

    it('should list only pending todos', () => {
      todoManager.complete(1);
      const result = todoManager.list('pending');
      expect(result).toContain('[2]');
      expect(result).toContain('Second todo');
      expect(result).not.toContain('First todo');
    });

    it('should list only completed todos', () => {
      todoManager.complete(1);
      const result = todoManager.list('completed');
      expect(result).toContain('✓ [1]');
      expect(result).toContain('~~First todo~~');
      expect(result).not.toContain('Second todo');
    });

    it('should return message when no todos found', () => {
      const emptyManager = new TodoManager();
      const result = emptyManager.list();
      expect(result).toContain('No todos found');
    });

    it('should return message when filtered todos not found', () => {
      const result = todoManager.list('completed');
      expect(result).toBe('No completed todos found.');
    });

    it('should show completion statistics', () => {
      todoManager.complete(1);
      const result = todoManager.list();
      expect(result).toContain('Total: 2 | Completed: 1 | Pending: 1');
    });
  });

  describe('complete', () => {
    beforeEach(() => {
      todoManager.add('Task to complete');
    });

    it('should mark todo as completed', () => {
      const result = todoManager.complete(1);
      expect(result).toBe('✓ Completed todo #1: Task to complete');
      const listResult = todoManager.list('completed');
      expect(listResult).toContain('✓ [1]');
    });

    it('should set completedAt timestamp', () => {
      const before = Date.now();
      todoManager.complete(1);
      const after = Date.now();
      const listResult = todoManager.list();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should return error if todo not found', () => {
      const result = todoManager.complete(999);
      expect(result).toBe('Todo #999 not found.');
    });

    it('should return message if already completed', () => {
      todoManager.complete(1);
      const result = todoManager.complete(1);
      expect(result).toBe('Todo #1 is already completed.');
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      todoManager.add('Todo to remove');
    });

    it('should remove todo by ID', () => {
      const result = todoManager.remove(1);
      expect(result).toBe('✗ Removed todo #1: Todo to remove');
      const listResult = todoManager.list();
      expect(listResult).toContain('No todos found');
    });

    it('should return error if todo not found', () => {
      const result = todoManager.remove(999);
      expect(result).toBe('Todo #999 not found.');
    });

    it('should maintain IDs correctly after removal', () => {
      todoManager.add('Second todo');
      todoManager.add('Third todo');
      todoManager.remove(2);
      const listResult = todoManager.list();
      expect(listResult).toContain('[1]');
      expect(listResult).toContain('[3]');
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      todoManager.add('Todo 1');
      todoManager.add('Todo 2');
      todoManager.complete(1);
    });

    it('should clear all todos', () => {
      const result = todoManager.clear();
      expect(result).toBe('Cleared all 2 todo(s).');
      const listResult = todoManager.list();
      expect(listResult).toContain('No todos found');
    });

    it('should clear only completed todos', () => {
      const result = todoManager.clear(true);
      expect(result).toBe('Cleared 1 completed todo(s).');
      const listResult = todoManager.list();
      expect(listResult).toContain('[2]');
      expect(listResult).toContain('Todo 2');
      expect(listResult).not.toContain('Todo 1');
    });

    it('should handle clearing when no completed todos', () => {
      todoManager.clear(true);
      const result = todoManager.clear(true);
      expect(result).toBe('Cleared 0 completed todo(s).');
    });
  });

  describe('stats', () => {
    beforeEach(() => {
      todoManager.add('Todo 1');
      todoManager.add('Todo 2');
      todoManager.add('Todo 3');
    });

    it('should show statistics', () => {
      const result = todoManager.stats();
      expect(result).toContain('📊 Todo Statistics:');
      expect(result).toContain('Total todos: 3');
      expect(result).toContain('Completed: 0');
      expect(result).toContain('Pending: 3');
      expect(result).toContain('Completion rate: 0.0%');
    });

    it('should calculate completion rate', () => {
      todoManager.complete(1);
      todoManager.complete(2);
      const result = todoManager.stats();
      expect(result).toContain('Total todos: 3');
      expect(result).toContain('Completed: 2');
      expect(result).toContain('Pending: 1');
      expect(result).toContain('Completion rate: 66.7%');
    });

    it('should handle 100% completion', () => {
      todoManager.complete(1);
      todoManager.complete(2);
      todoManager.complete(3);
      const result = todoManager.stats();
      expect(result).toContain('Completion rate: 100.0%');
    });

    it('should handle empty todo list', () => {
      const emptyManager = new TodoManager();
      const result = emptyManager.stats();
      expect(result).toContain('Total todos: 0');
      expect(result).toContain('Completed: 0');
      expect(result).toContain('Pending: 0');
      expect(result).toContain('Completion rate: 0');
    });
  });
});
