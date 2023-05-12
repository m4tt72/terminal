// This file is used to normalize command handlers

export interface CommandCallback {
  setTheme: (value: string) => string;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  execute(inputCmd: string, callback: CommandCallback): Promise<string>;
}

export interface CommandHandlers {
  [key: string]: Command;
}
