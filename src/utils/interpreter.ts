import React from 'react';
import { History } from '../interfaces/history';
import axios from 'axios';
import { getBio, getProjects } from '../api';

export const interpreter = async (
  history: Array<History>,
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');

  switch (args[0]) {
    case 'clear':
      clearHistory();

      break;
    case 'help':
      setHistory(
        `list of available commands:

about     - print information about the author
projects  - print the list of the author's projects
whoami    - print effective userid
date      - print the system date and time

`,
      );

      break;
    case 'date':
      setHistory(new Date().toString());

      break;
    case 'whoami':
      setHistory('guest');

      break;
    case 'about':
      const bio = await getBio();

      setHistory(bio);
      break;
    case 'projects':
      const projects = await getProjects();

      setHistory(projects.join('\n'));
      break;
    case 'vi':
    case 'vim':
      setHistory(`${args[0]} is not that good, try 'emacs'.`);

      break;
    case 'emacs':
      setHistory(`${args[0]} is not that good, try 'vim'.`);

      break;
    case '':
      setHistory('');

      break;
    default:
      setHistory(
        `shell: command not found: ${args[0]}. Try 'help' to get started.`,
      );

      break;
  }

  setCommand('');
};
