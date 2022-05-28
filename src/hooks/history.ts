import React from 'react';
import { History } from '../interfaces/history';

export const useHistory = () => {
  const [history, setHistory] = React.useState<Array<History>>([]);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);

  return {
    history,
    command,
    lastCommandIndex,
    setHistory: (value: string) =>
      setHistory([
        ...history,
        {
          id: history.length,
          date: new Date(),
          command,
          output: value,
        },
      ]),
    setCommand,
    setLastCommandIndex,
    clearHistory: () => setHistory([]),
  };
};
