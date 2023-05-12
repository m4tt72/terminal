import type {
  Command,
  CommandCallback,
  CommandHandlers,
} from '../interfaces/command';
import * as bin from './bin';
import { NonDefined } from './errors/NonDefined';
import { GenerateType, generateHTMLInfo } from './errors/generateHTMLError';

export const allCommand = [
  { name: 'clear' } as Command,
  ...Object.values(bin as unknown as CommandHandlers),
];

export const findCommand = (commandName: string) => {
  return Object.entries(bin as unknown as CommandHandlers).find(
    ([_, command]) =>
      commandName === command.name || command.aliases?.includes(commandName),
  )?.[1];
};

export const commandDispatcher = async (
  inputCmd: string,
  callback: CommandCallback,
) => {
  const [name] = inputCmd.split(' ').splice(1);
  const commandHandler = findCommand(name);

  if (!commandHandler)
    return generateHTMLInfo(
      GenerateType.Error,
      new NonDefined(
        `Command '${name}' not found. Try 'help' to see all commands.`,
      ),
    );

  try {
    return await commandHandler.execute(inputCmd, callback);
  } catch (error) {
    return generateHTMLInfo(GenerateType.Error, error as Error);
  }
};
