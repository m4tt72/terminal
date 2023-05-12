import * as bin from './bin';
import { allCommand } from './commandDispatcher';

export const commandExists = (command: string) => {
  const commands = ['clear', ...allCommand.map((command) => command.name)];

  return commands.indexOf(command.split(' ')[0]) !== -1;
};
