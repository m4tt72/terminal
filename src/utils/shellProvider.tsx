import React, { useEffect } from 'react';
import { History } from '../interfaces/history';
import * as bin from './bin';
import { trex } from './bin';
import { useTheme } from './themeProvider';

interface ShellContextType {
  history: History[];
  command: string;
  lastCommandIndex: number;
  isTrex: boolean;

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
  const [isTrex, setIsTrex] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  let score = 0;

  useEffect(() => {
    setCommand('banner');
  }, []);

  let dino;
  let cactus;
  let scoreText;

  function jump() {
    if (dino.classList.value != "jump") {
      dino.classList.add("jump");

      setTimeout(function () {
        dino.classList.remove("jump");
      }, 300);
    }
  }

  useEffect(() => {
    if (isTrex) {

      dino = document.getElementById("dino");
      cactus = document.getElementById("cactus");
      scoreText = document.getElementById("score");


      setInterval(function () {
        score += 1;
        scoreText.innerHTML = score;
        // get current dino Y position
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        // get current cactus X position
        let cactusLeft = parseInt(
          window.getComputedStyle(cactus).getPropertyValue("left")
        );

        // detect collision
        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 180) {
          setIsTrex(false);
          changeHistory("Game Over!, Score : " + score);
        }
      }, 10);

      document.addEventListener("keydown", function (event) {
        if (event.key == " " || event.code == "Space" || event.keyCode == 32)
          jump();
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === 'x' && event.ctrlKey && isTrex) {
          setIsTrex(false);
          changeHistory("Game Over!, Score : " + score);
        }
      });

    }

  }, [isTrex])

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

  const changeHistory = (output: string) => {
    let newHistory = history.slice(0, -1);
    _setHistory([
      ...newHistory,
      {
        id: history.length,
        date: new Date(),
        command: command.split(' ').slice(1).join(' '),
        output,
      },
    ]);
  };

  const setLastCommandIndex = (index: number) => {
    _setLastCommandIndex(index);
  };

  const execute = async () => {
    const [cmd, ...args] = command.split(' ').slice(1);

    switch (cmd) {
      case 'trex':
        setHistory(trex());
        setIsTrex(true)
        break;
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
        isTrex,
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