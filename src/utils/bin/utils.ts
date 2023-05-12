import packageJson from '../../../package.json';
import { Command } from '../../interfaces/command';
import { findCommand } from '../commandDispatcher';
import { NonDefined } from '../errors/NonDefined';
import { generateCommandUsage } from '../generateCommandUsage';
import { getArguments } from '../parseCommand';
import * as bin from './index';

const help = async (args: string[]): Promise<string> => {
  if (!args[0]) {
    const commands = Object.values(bin)
      .map((classItem) => {
        return `${classItem.name}: ${classItem.description}`;
      })
      .join('\n ');

    return `Available commands:\n ${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
  }

  const command = findCommand(args[0]);

  if (!command)
    throw new NonDefined(
      `Command ${args[0]} not found. Try 'help' to see all commands.`,
    );

  return `${command.name}: ${command.description}\n\n${command.usage}\n${
    command.aliases ? `Aliases: ${command.aliases.join(', ')}` : ''
  }`;
};

export const helpCommand: Command = {
  name: 'help',
  description: 'To get help about available commands.',
  usage: generateCommandUsage({
    usage: 'help [command]',
    example: 'help echo',
  }),

  execute(inputCmd: string) {
    return help(getArguments(inputCmd));
  },
};

const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'To print a message.',
  usage: generateCommandUsage({
    usage: 'echo [message]',
    example: 'echo Hello World!',
  }),
  execute(inputCmd: string) {
    return echo(getArguments(inputCmd));
  },
};

const whoami = async (args: string[]): Promise<string> => {
  return 'guest';
};

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'To get the current user.',
  usage: generateCommandUsage({ usage: 'whoami' }),
  execute(inputCmd: string) {
    return whoami(getArguments(inputCmd));
  },
};

const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const dateCommand: Command = {
  name: 'date',
  description: 'To get the current date.',
  usage: generateCommandUsage({ usage: 'date' }),
  execute(inputCmd: string) {
    return date(getArguments(inputCmd));
  },
};

const gui = async (args: string[]): Promise<string> => {
  window.open('https://m4tt72.com', '_self');

  return 'Opening GUI version...';
};

export const guiCommand: Command = {
  name: 'gui',
  description: 'To open the GUI version.',
  usage: generateCommandUsage({ usage: 'gui' }),
  execute(inputCmd: string) {
    return gui(getArguments(inputCmd));
  },
};

const email = async (args: string[]): Promise<string> => {
  window.open('mailto:hi@nm4tt72.com');

  return 'Opening mailto:hi@m4tt72.com...';
};

export const emailCommand: Command = {
  name: 'email',
  description: 'To open the email client.',
  usage: generateCommandUsage({ usage: 'email' }),
  execute(inputCmd: string) {
    return email(getArguments(inputCmd));
  },
};

const sudo = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, 1000);

  return `Permission denied: unable to run the command '${args[0]}' as root.`;
};

export const sudoCommand: Command = {
  name: 'sudo',
  description: 'To run a command as root.',
  usage: generateCommandUsage({
    usage: 'sudo [command]',
    args: '[command]: just a normal command',
    example: 'sudo rm -rf /*',
  }),
  execute(inputCmd: string) {
    return sudo(getArguments(inputCmd));
  },
};

const repo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://github.com/m4tt72/terminal', '_blank');
  }, 1000);

  return 'Opening repository...';
};

export const repoCommand: Command = {
  name: 'repo',
  description: 'To open the repository.',
  usage: generateCommandUsage({ usage: 'repo' }),
  execute(inputCmd: string) {
    return repo(getArguments(inputCmd));
  },
};

const donate = async (args?: string[]): Promise<string> => {
  window.open(packageJson.funding.url, '_blank');

  return 'Opening donation url...';
};

export const donateCommand: Command = {
  name: 'donate',
  description: 'To donate to the project.',
  usage: generateCommandUsage({ usage: 'donate' }),
  execute(inputCmd: string) {
    return donate(getArguments(inputCmd));
  },
};

const banner = async (args?: string[]) => {
  return `
███╗   ███╗██╗  ██╗████████╗████████╗███████╗██████╗
████╗ ████║██║  ██║╚══██╔══╝╚══██╔══╝╚════██║╚════██╗
██╔████╔██║███████║   ██║      ██║       ██╔╝ █████╔╝
██║╚██╔╝██║╚════██║   ██║      ██║      ██╔╝ ██╔═══╝
██║ ╚═╝ ██║     ██║   ██║      ██║      ██║  ███████╗
╚═╝     ╚═╝     ╚═╝   ╚═╝      ╚═╝      ╚═╝  ╚══════╝ v${packageJson.version}

Type 'help' to see list of available commands.

--
The project is open-source 🎉 type 'repo' to check out the repository.

New 🎉: Try out the new 'theme' command. See all available themes <a href="https://github.com/m4tt72/terminal/tree/master/docs/themes">in the docs</a>.
New 🎉: New command 'neofetch', for you linux.
--
`;
};

export const bannerCommand: Command = {
  name: 'banner',
  description: 'To print the banner.',
  usage: generateCommandUsage({ usage: 'banner' }),
  execute() {
    return banner();
  },
};
