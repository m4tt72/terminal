import Themes from '../../../themes.json';

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string> => {
  if (args.length === 0) {
    return `Usage: theme [arg]
Args:
  - ls: List all themes
  - set: set a theme

Example: 
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`;
  }

  switch (args[0]) {
    case 'ls':
      return Themes.map((theme) => theme.name.toLowerCase()).join(', ');
    case 'set':
      const selectedTheme = args[1];

      return callback(selectedTheme);
  }
};
