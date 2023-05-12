import { getBio } from '../../api';
import { Command } from '../../interfaces/command';
import { generateCommandUsage } from '../generateCommandUsage';

const about = async (): Promise<string> => {
  const bio = await getBio();

  return bio;
};

export const aboutCommand: Command = {
  name: 'about',
  description: 'To get my bio and infomation.',
  usage: generateCommandUsage({ usage: 'about' }),
  execute() {
    return about();
  },
};
