import config from '../../../config.json';
import { Command } from '../../interfaces/command';
import { Missing, MissingType } from '../errors/Missing';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';

export const socialCommand: Command = {
  name: 'social',
  description: 'Open social links',
  usage: generateCommandUsage({
    usage: 'social [arg]',
    args: '[github]: open github\n[telegram]: open telegram',
  }),

  async execute(inputCmd: string): Promise<string> {
    const args = getArguments(inputCmd);
    const social = args[0];

    if (!social)
      throw new Missing(MissingType.Arguments, 'social platform name');

    switch (social) {
      case 'github':
        window.open(`https://github.com/${config.social.github}`);
        return 'Opening GitHub...';
      case 'linkedin':
        window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
        return 'Opening linkedin...';
      case 'instagram':
        window.open(`https://www.instagram.com/${config.social.instagram}/`);
        return 'Opening instagram...';
      default:
        return `Unknown social platform: ${social}`;
    }
  },
};
