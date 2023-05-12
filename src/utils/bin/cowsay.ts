import { cowsay as say } from 'cowsayjs';
import { getQuote } from '../../api';
import { Command } from '../../interfaces/command';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';

const cowsay = async (args: string[]): Promise<string> => {
  let output = '';

  if (args.length < 1 || args[0] === '') {
    const quote = (await getQuote()).quote;
    return say({ message: quote });
  }

  output = args.join(' ');
  return say({ message: output });
};

export const cowsayCommand: Command = {
  name: 'cowsay',
  description: 'To get a cow to say something.',
  usage: generateCommandUsage({
    usage: 'cowsay [args] [options]',
    args: '[some text]: a cow will say someting...',
  }),
  execute(inputCmd: string) {
    return cowsay(getArguments(inputCmd));
  },
};
