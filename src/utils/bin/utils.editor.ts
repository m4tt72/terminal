import { Command } from '../../interfaces/command';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';

const vi = async (args: string[]): Promise<string> => {
  return `why use vi? try 'emacs'.`;
};

export const viCommand: Command = {
  name: 'vi',
  description: 'To open the vi editor.',
  usage: generateCommandUsage({ usage: 'vi' }),
  execute(inputCmd: string) {
    return vi(getArguments(inputCmd));
  },
};

const vim = async (args: string[]): Promise<string> => {
  return `why use vim? try 'emacs'.`;
};

export const vimCommand: Command = {
  name: 'vim',
  description: 'To open the vim editor.',
  usage: generateCommandUsage({ usage: 'vim' }),
  execute(inputCmd: string) {
    return vim(getArguments(inputCmd));
  },
};

const emacs = async (args?: string[]): Promise<string> => {
  return `really? emacs? you should be using 'vim'`;
};

export const emacsCommand: Command = {
  name: 'emacs',
  description: 'To open the emacs editor.',
  usage: generateCommandUsage({ usage: 'emacs' }),
  execute(inputCmd: string) {
    return emacs(getArguments(inputCmd));
  },
};
