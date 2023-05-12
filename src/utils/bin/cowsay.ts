import { cowsay as say } from 'cowsayjs';
import { getQuote } from '../../api';

export const cowsay = async (args: string[]): Promise<string> => {
  let output = '';

  if (args.length < 1 || args[0] === '') {
    const quote = (await getQuote()).quote;
    return say({ message: quote });
  }

  output = args.join(' ');
  return say({ message: output });
};
