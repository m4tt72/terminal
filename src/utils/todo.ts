interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

class TodoManager {
  private todos: Todo[] = [];
  private nextId: number = 1;
  private readonly storageKey = "terminal-todos";

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.todos = parsed.todos || [];
        this.nextId = parsed.nextId || 1;
        // Convert date strings back to Date objects
        this.todos = this.todos.map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          completedAt: todo.completedAt
            ? new Date(todo.completedAt)
            : undefined,
        }));
      } catch (e) {
        console.error("Failed to load todos:", e);
      }
    }
  }

  private saveTodos(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        todos: this.todos,
        nextId: this.nextId,
      })
    );
  }

  add(text: string): string {
    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    this.saveTodos();
    return `✓ Added todo #${todo.id}: ${text}`;
  }

  list(filter?: "all" | "completed" | "pending"): string {
    let filteredTodos = this.todos;

    if (filter === "completed") {
      filteredTodos = this.todos.filter((t) => t.completed);
    } else if (filter === "pending") {
      filteredTodos = this.todos.filter((t) => !t.completed);
    }

    if (filteredTodos.length === 0) {
      return filter
        ? `No ${filter} todos found.`
        : 'No todos found. Use "todo add <text>" to create one.';
    }

    const todoList = filteredTodos
      .map((todo) => {
        const status = todo.completed ? "✓" : "○";
        const prefix = `${status} [${todo.id}]`;
        // Add visual indication for completed todos
        const text = todo.completed ? `~~${todo.text}~~` : todo.text;
        return `${prefix} ${text}`;
      })
      .join("\n");

    const total = this.todos.length;
    const completedCount = this.todos.filter((t) => t.completed).length;
    const pendingCount = this.todos.filter((t) => !t.completed).length;

    const summary = `\n─────────────────────────────\nTotal: ${total} | Completed: ${completedCount} | Pending: ${pendingCount}`;

    return todoList + summary;
  }

  complete(id: number): string {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return `Todo #${id} not found.`;
    }
    if (todo.completed) {
      return `Todo #${id} is already completed.`;
    }
    todo.completed = true;
    todo.completedAt = new Date();
    this.saveTodos();
    return `✓ Completed todo #${id}: ${todo.text}`;
  }

  remove(id: number): string {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return `Todo #${id} not found.`;
    }
    const removed = this.todos.splice(index, 1)[0];
    this.saveTodos();
    return `✗ Removed todo #${id}: ${removed.text}`;
  }

  clear(onlyCompleted: boolean = false): string {
    if (onlyCompleted) {
      const completedCount = this.todos.filter((t) => t.completed).length;
      this.todos = this.todos.filter((t) => !t.completed);
      this.saveTodos();
      return `Cleared ${completedCount} completed todo(s).`;
    } else {
      const count = this.todos.length;
      this.todos = [];
      this.saveTodos();
      return `Cleared all ${count} todo(s).`;
    }
  }

  stats(): string {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

    return `📊 Todo Statistics:\n├─ Total todos: ${total}\n├─ Completed: ${completed}\n├─ Pending: ${pending}\n└─ Completion rate: ${completionRate}%`;
  }
}

export const todoManager = new TodoManager();
