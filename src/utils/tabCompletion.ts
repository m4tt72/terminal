import { allCommand } from './commandDispatcher';

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const commands = allCommand.filter((entry) => entry.name.startsWith(command));

  if (commands.length === 1) {
    setCommand(commands[0].name);
  }
};
