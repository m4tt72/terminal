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
  switch (command) {
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
      setHistory(`${command} is not that good, try 'emacs'.`);

      break;
    case 'emacs':
      setHistory(`${command} is not that good, try 'vim'.`);

      break;
    case '':
      setHistory('');

      break;
    default:
      setHistory(
        `shell: command not found: ${command}. Try 'help' to get started.`,
      );

      break;
  }

  setCommand('');
};
