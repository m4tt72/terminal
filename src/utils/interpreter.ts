import React from 'react';
import { History } from '../interfaces/history';

export const interpreter = (
  history: Array<History>,
  command: string,
  setHistory: React.Dispatch<React.SetStateAction<History[]>>,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  switch (command) {
    case 'clear':
      setHistory([]);
      break;
    case 'help':
      setHistory([
        ...history,
        {
          command,
          output: `list of available commands:

about   - print information about the author
whoami  - print effective userid
date    - print the system date and time

`,
        },
      ]);
      break;
    case 'date':
      setHistory([
        ...history,
        {
          command,
          output: new Date().toString(),
        },
      ]);
      break;
    case 'whoami':
      setHistory([
        ...history,
        {
          command,
          output: 'guest',
        },
      ]);
      break;
    case 'about':
      setHistory([
        ...history,
        {
          command,
          output: `I'm Yassine Fathi, Software Developer and Linux enthusiast. Try: 'projects' to see the list of projects I made`,
        },
      ]);
      break;
    default:
      setHistory([
        ...history,
        {
          command,
          output: `shell: command not found: ${command}. Try 'help' to get started`,
        },
      ]);
      break;
  }

  setCommand('');
};
