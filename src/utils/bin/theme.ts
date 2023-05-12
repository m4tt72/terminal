import Themes from '../../../themes.json';
import { Command, CommandCallback } from '../../interfaces/command';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';

const usage = generateCommandUsage({
  usage: 'theme [arg]',
  args: '[ls]: list all themes\n[set]: set a theme\n[random]: set a random theme',
  example: 'theme ls # to list all themes\ntheme set Gruvbox # to set a theme',
});

const theme = async (
  args: string[],
  callback: (value: string) => string,
): Promise<string> => {
  switch (args[0]) {
    case 'ls':
      let result = Themes.map((theme) => theme.name.toLowerCase()).join(', ');
      result += '\n\n';
      result += `You can preview all these themes <a href="https://github.com/m4tt72/terminal/tree/master/docs/themes">in the docs</a>`;

      return result;
    case 'set':
      const selectedTheme = args[1];

      return callback(selectedTheme);
    case 'random':
      const randomTheme = Themes[Math.floor(Math.random() * Themes.length)];

      return callback(randomTheme.name.toLowerCase());
    default:
      return usage;
  }
};

export const themeCommand: Command = {
  name: 'theme',
  description: 'To get a theme to set.',
  usage,
  execute(inputCmd: string, { setTheme }: CommandCallback) {
    return theme(getArguments(inputCmd), setTheme);
  },
};
