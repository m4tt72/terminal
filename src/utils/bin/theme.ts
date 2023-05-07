import Themes from '../../../themes.json'

export async function theme(args: string[],
  callback?: (value: string) => string) {
  if (args.length === 0) {
    return `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`
  }

  switch (args[0]) {
    case 'ls':
      return `${Themes.map(theme => theme.name.toLowerCase()).join(', ')}\n\nYou can preview all these themes <a href="https://github.com/m4tt72/terminal/tree/master/docs/themes">in the docs</a>`
    case 'set':
      return callback(args[1])
    case 'random':
      return callback(Themes[Math.floor(Math.random() * Themes.length)].name.toLowerCase())
  }
}
