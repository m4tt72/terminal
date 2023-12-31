# [M4TT72 | Terminal](https://term.m4tt72.com)

A terminal style website

![screenshot](/docs/screenshot.png)

## why?

I wanted to have a terminal style website for a long time, and I finally decided to build one.

## Quick Start

### Using docker (recommended)

```bash
docker run -d --name terminal -p 3000:3000 m4tt72/terminal
```

If you want to run with custom configuration, make sure you have a copy of `config.json` then mount in the container:

```bash
docker run -d \
  --name terminal \
  -p 3000:3000 \
  m4tt72/terminal
```

### Using npm/yarn

1. Install dependencies:

```bash
yarn install
```

2. Build the project:

```bash
yarn build
```

3. Run the server:

```bash
yarn start
```

## Themes

![themes](/docs/screenshot.gif)

[Here's](/docs/themes) a list of available themes.


## Contributing

Please feel free to pull requests or log issues.

Thanks!

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=m4tt72/terminal&type=Date)](https://star-history.com/#m4tt72/terminal&Date)