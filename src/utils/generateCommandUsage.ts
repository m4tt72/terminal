export interface GenerateCommand {
  usage: string;
  example?: string;
  args?: string;
}

export const generateCommandUsage = ({
  usage,
  example,
  args,
}: GenerateCommand) =>
  `Usage: \n${usage}\n\n${example ? `Example: \n${example}\n\n` : ''}${
    args ? `Arguments: \n${args}\n\n` : ''
  }`;
