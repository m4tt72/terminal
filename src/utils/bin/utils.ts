import packageJson from '../../../package.json';
import * as bin from './index';
import config from '../../../config.json';
import { getBanner } from '../../api';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).filter(x => config.hideCommands.indexOf(x) === -1).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return 'guest';
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const gui = async (args: string[]): Promise<string> => {
  window.open(packageJson.author.url, '_self');

  return 'Opening GUI version...';
};

export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${packageJson.author.email}`);

  return `Opening mailto:${packageJson.author.email}...`;
};

export const vi = async (args: string[]): Promise<string> => {
  return `why use vi? try 'emacs'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `why use vim? try 'emacs'.`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `really? emacs? you should be using 'vim'`;
};

export const secretcmd = async (args?: string[]): Promise<string> => {
  return `you don't suppose to see this unless you unhide it from config`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, 1000);

  return `Permission denied: unable to run the command '${args[0]}' as root.`;
};

export const repo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open(packageJson.repository.url, '_blank');
  }, 1000);

  return 'Opening repository...';
};

export const donate = async (args?: string[]): Promise<string> => {
  window.open(packageJson.funding.url, '_blank');

  return 'Opening donation url...';
};

export const banner = async (args?: string[]): Promise<string> => {
  const banner = await getBanner();

  const renderredBanner = banner
    .replace("{{VERSION}}", packageJson.version)
    .replace("{{REPO_URL}}", packageJson.repository.url)

  return renderredBanner;
};
