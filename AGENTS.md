# AGENTS.md - Repository Guide for Agentic Coding

This file contains essential information for agentic coding agents working in this repository.

## Project Overview
- **Framework**: Svelte 4 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Type Checking**: TypeScript with `svelte-check`
- **Node Version**: >=18.17.0

## Commands

### Development
- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run Svelte type checking

### Testing
- `npm run test` - Run unit/component tests once
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report (85%+ target)
- `npm run test:e2e` - Run E2E tests (Playwright, headless)
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI
- `npm run test:e2e:headed` - Run E2E tests in headed browser
- `npm run test:all` - Run all tests (unit + E2E)

### Running Single Test
- Unit/component: `vitest run [filename]` or `vitest run -t [test-name]`
- E2E: `npx playwright test [filename]` or `npx playwright test -g [test-name]`

### Pre-commit Hook
Tests run automatically on pre-commit for staged TypeScript/Svelte files using husky + lint-staged.

### Coverage
Target: 85%+ across all files. View coverage report in `coverage/index.html`.

## Code Style Guidelines

### File Structure & Naming
- **Components**: PascalCase (`src/components/History.svelte`)
- **Utilities**: lowercase (`src/utils/commands.ts`)
- **Stores**: `src/stores/[name].ts` pattern
- **Interfaces**: `src/interfaces/[name].ts` pattern
- **Entry point**: `src/main.ts`

### Imports
- Use single quotes for all import paths
- Svelte imports use named imports from specific packages:
  ```ts
  import { writable } from 'svelte/store';
  import { onMount, afterUpdate } from 'svelte';
  ```
- Relative imports use `./` or `../` notation
- JSON imports are supported: `import themes from '../../themes.json';`

### Formatting
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings and imports
- **Semicolons**: Used consistently
- **Trailing commas**: No trailing commas (except for arrays/objects on multiple lines)

### TypeScript
- **Type annotations**: Explicit types on function parameters and returns
- **Interfaces**: Use `interface` for object shapes in `src/interfaces/` when shared across modules; inline interfaces are acceptable for module-private types
- **Type imports**: Use `type` keyword for type-only imports when needed
- **Non-null assertions**: Used when guaranteed (`themes.find(...)!`)
- **Strict mode**: Enabled via `tsconfig.json` (checkJs: true, allowJs: true)

### Svelte Components
- Use `<script lang="ts">` for TypeScript support
- Reactive stores accessed with `$` prefix: `$theme`, `$history`
- Bind elements with `bind:this={elementRef}` pattern
- Event handlers use `on:eventName={handler}` syntax
- Lifecycle hooks: `onMount()`, `afterUpdate()`, etc. from `svelte`

### State Management
- Svelte stores for global state (`writable` from 'svelte/store')
- Persist stores to localStorage using `subscribe()`:
  ```ts
  theme.subscribe((value) => {
    localStorage.setItem('colorscheme', JSON.stringify(value));
  });
  ```

### Naming Conventions
- **Variables/functions**: camelCase (`command`, `handleKeyDown`, `historyIndex`)
- **Classes**: PascalCase (`TodoManager`)
- **Interfaces**: PascalCase (`Theme`, `Command`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants
- **Component props**: camelCase

### Error Handling
- Use try-catch for localStorage parsing and network requests
- Return descriptive error messages to users
- Log errors with `console.error()` for debugging
- Validate user input before processing

### CSS/Styling
- Tailwind CSS for all styling
- Use Tailwind utility classes directly in HTML/Svelte templates
- Dynamic styles via `style={}` attribute with template literals
- Responsive design: `sm:`, `md:`, `lg:` prefixes for breakpoints
- Use `class="visible md:hidden"` for mobile-only elements

### Code Patterns
- Commands in `src/utils/commands.ts` return strings or Promises
- Command signature: `(args: string[]) => Promise<string> | string`
- Use `window.open()` for external links (with `"_blank"` for new tabs)
- Environment variables via `import.meta.env.VITE_*`
- Template strings for multi-line output (banner, help text)
- Async functions use `async`/`await` pattern
- Use `Array.join()` for string concatenation

### Additional Notes
- No comments in code - keep it self-documenting
- Use `localStorage` for client-side persistence
- Commands are case-sensitive
- Default theme is 'GruvboxDark'
- Terminal hostname from `window.location.hostname`
