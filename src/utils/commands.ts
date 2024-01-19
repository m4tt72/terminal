import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  about: () => `why use vi? try 'emacs'`,
  utilities: () => `why use vim? try 'emacs'`,
  tokenomics: () => `why use emacs? try 'vim'`,
  whitepaper: (args: string[]) => {
    window.open('/whitepaper.pdf');

    return `File Integrity Checksum MD5 Hash '${args[0]}' sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==" VERIFIED`;
  },
  buy: () => {
    window.open('https://uniswap.com', '_blank');

    return 'Swap Protocol Launched...';
  },
  clear: () => {
    history.set([]);

    return '';
  },
  support: () => {
    window.open(`mailto:anonymous@broscams`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  discord: () => {
    window.open(packageJson.funding.url, '_blank');

    return 'Discord Launch...';
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  home: () => `

  ██████╗░██████╗░░█████╗░░██████╗░█████╗░░█████╗░███╗░░░███╗░██████╗
  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗░████║██╔════╝
  ██████╦╝██████╔╝██║░░██║╚█████╗░██║░░╚═╝███████║██╔████╔██║╚█████╗░
  ██╔══██╗██╔══██╗██║░░██║░╚═══██╗██║░░██╗██╔══██║██║╚██╔╝██║░╚═══██╗
  ██████╦╝██║░░██║╚█████╔╝██████╔╝╚█████╔╝██║░░██║██║░╚═╝░██║██████╔╝
  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░ v${packageJson.version}

Type 'help' to see list of all the commands.
`,
};
