import { history } from '../stores/history';

const hostname = window.location.hostname;

export const commands: Record<
  string,
  (args: string[]) => Promise<string> | string
> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  pwd: () => '/home/guest',
  whoami: () => 'guest',
  clear: () => {
    history.set([]);

    return '';
  },
  echo: (args: string[]) => args.join(' '),
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];
    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}`;
    }
  },
};
