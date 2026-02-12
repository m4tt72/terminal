# [M4TT72 | Terminal](https://term.fathi.me)

![CI](https://github.com/m4tt72/terminal/workflows/Test/badge.svg)

A terminal-style website built with Svelte 4, TypeScript, and Tailwind CSS.

![screenshot](/docs/screenshot.png)

## Features

- **Theme Switching**: Multiple built-in themes with easy switching
- **Todo List**: Manage tasks with add, list, complete, and remove commands
- **Weather**: Check weather for any city using wttr.in
- **Command History**: Navigate through previous commands with arrow keys
- **Auto-complete**: Tab completion for commands
- **URL Fetching**: Make HTTP requests with curl-like functionality
- **Keyboard Shortcuts**: Ctrl+L to clear screen, arrow keys for history
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Svelte 4
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest (unit/components), Playwright (E2E)
- **Coverage**: 85%+ code coverage
- **Node Version**: >=18.17.0

## Quick Start

### Using Docker (recommended)

```bash
docker run -d --name terminal -p 3000:3000 ghcr.io/m4tt72/terminal
```

### Using npm

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Testing

Run all tests:

```bash
npm run test:all
```

Run unit tests with coverage:

```bash
npm run test:coverage
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with UI:

```bash
npm run test:ui
```

Run E2E tests:

```bash
npm run test:e2e
```

Run E2E tests with UI:

```bash
npm run test:e2e:ui
```

Run a single test:

```bash
# Unit/component
vitest run [filename]

# E2E
npx playwright test [filename]
```

## Themes

![themes](/docs/screenshot.gif)

[Here's](/docs/themes) a list of available themes.

Switch themes using the `theme` command:

```bash
theme ls           # List all themes
theme set gruvboxdark  # Set a specific theme
```

## Available Commands

Type `help` to see all available commands.

## Version

Current version: 3.5.0

## License

MIT License - see [LICENSE](LICENSE) for details

## Contributing

We welcome contributions! Please read [AGENTS.md](AGENTS.md) for development guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test:all`)
5. Commit your changes (pre-commit hooks will run tests automatically)
6. Push to your fork
7. Open a Pull Request

### Guidelines

- Write tests for new features
- Maintain 85%+ code coverage
- Follow the existing code style
- Update documentation as needed

## Important Note

This is the Svelte 4 version of [m4tt72/terminal](https://github.com/m4tt72/terminal).

The old React version is available on the [v2 branch](https://github.com/m4tt72/terminal/tree/v2) and is no longer maintained.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=m4tt72/terminal&type=Date)](https://star-history.com/#m4tt72/terminal&Date)
