import * as cow from 'cowsay-browser';
import { getQuote } from '../../api';

export const cowsay = async (args?: string[]): Promise<string> => {
  let output = '';
  if (args && args.length > 1) {
    output = args.join(' ');
    return cow.say({ text: output });
  } else {
    const quote = (await getQuote()).quote;
    return cow.say({ text: quote });
  }

};
