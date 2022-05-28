import React, { useEffect } from 'react';
import { History } from '../interfaces/history';
import * as bin from './bin';
import { useTheme } from './themeProvider';

interface ShellContextType {
  history: History[];
  command: string;
  lastCommandIndex: number;

  setHistory: (output: string) => void;
  setCommand: (command: string) => void;
  setLastCommandIndex: (index: number) => void;
  execute: (command: string) => Promise<void>;
  clearHistory: () => void;
}

const ShellContext = React.createContext<ShellContextType>(null);

interface ShellProviderProps {
  children: React.ReactNode;
}

export const useShell = () => React.useContext(ShellContext);

export const ShellProvider: React.FC<ShellProviderProps> = ({ children }) => {
  const [init, setInit] = React.useState(true);
  const [history, _setHistory] = React.useState<History[]>([]);
  const [command, _setCommand] = React.useState<string>('');
  const [lastCommandIndex, _setLastCommandIndex] = React.useState<number>(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCommand('banner');
  }, []);

  useEffect(() => {
    if (!init) {
      execute();
    }
  }, [command, init]);

  const setHistory = (output: string) => {
    _setHistory([
      ...history,
      {
        id: history.length,
        date: new Date(),
        command: command.split(' ').slice(1).join(' '),
        output,
      },
    ]);
  };

  const setCommand = (command: string) => {
    _setCommand([Date.now(), command].join(' '));

    setInit(false);
  };

  const clearHistory = () => {
    _setHistory([]);
  };

  const setLastCommandIndex = (index: number) => {
    _setLastCommandIndex(index);
  };

  const execute = async () => {
    const [cmd, ...args] = command.split(' ').slice(1);

    switch (cmd) {
      case 'theme':
        const output = await bin.theme(args, setTheme);

        setHistory(output);

        break;
      case 'clear':
        clearHistory();
        break;
      case '':
        setHistory('');
        break;
      default: {
        if (Object.keys(bin).indexOf(cmd) === -1) {
          setHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
        } else {
          try {
            const output = await bin[cmd](args);

            setHistory(output);
          } catch (error) {
            setHistory(error.message);
          }
        }
      }
    }
  };

  return (
    <ShellContext.Provider
      value={{
        history,
        command,
        lastCommandIndex,
        setHistory,
        setCommand,
        setLastCommandIndex,
        execute,
        clearHistory,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
};
