import { useMatomo } from '@m4tt72/matomo-tracker-react';
import React, { useEffect, useState } from 'react';
import { commandExists } from '../../utils/commandExists';
import { useShell } from '../../utils/shellProvider';
import { handleTabCompletion } from '../../utils/tabCompletion';
import { useTheme } from '../../utils/themeProvider';
import { Ps1 } from '../ps1';

export const Input = ({ inputRef, containerRef }) => {
  const { trackEvent } = useMatomo();
  const { theme } = useTheme();
  const [value, setValue] = useState('');
  const {
    setCommand,
    history,
    lastCommandIndex,
    setHistory,
    setLastCommandIndex,
    clearHistory,
  } = useShell();

  useEffect(() => {
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();

      setValue('');

      setHistory('');

      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();

      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      handleTabCompletion(value, setValue);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();

      setLastCommandIndex(0);

      setCommand(value);

      setValue('');

      trackEvent({
        category: 'Command Executed',
        action: value || 'no command',
      });
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        setValue(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        setValue(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setValue('');
      }
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className="focus:outline-none flex-grow"
        aria-label="prompt"
        style={{
          backgroundColor: theme.background,
          color: commandExists(value) || value === '' ? theme.green : theme.red,
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default Input;
