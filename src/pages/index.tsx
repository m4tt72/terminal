import React from 'react';
import Ps1 from '../components/ps1';
import { interpreter } from '../utils/interpreter';

import { History } from '../interfaces/history';

const IndexPage: React.FC = () => {
  const inputRef = React.useRef(null);
  const [command, setCommand] = React.useState<string>('');
  const [history, setHistory] = React.useState<Array<History>>([]);

  const init = () => {
    setHistory([
      {
        command: '',
        output: `
  __  __ _  _ _____ _____ _____ ____
 |  \\/  | || |_   _|_   _|___  |___ \\
 | |\\/| | || |_| |   | |    / /  __) |
 | |  | |__   _| |   | |   / /  / __/
 |_|  |_|  |_| |_|   |_|  /_/  |_____|

This website is currently under development, only few commands are available atm.
`,
      },
    ]);
  };

  React.useEffect(() => {
    inputRef.current.focus();

    init();
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    interpreter(history, command, setHistory, setCommand);

    event.preventDefault();
  };

  return (
    <div>
      {history.map((entry, index) => (
        <>
          {entry.command && (
            <div
              className="flex flex-row space-x-2"
              key={entry.command + index}
            >
              <div className="flex-shrink">
                <Ps1 />
              </div>

              <div className="flex-grow">{entry.command}</div>
            </div>
          )}

          {entry.output && (
            <div className="whitespace-pre-wrap">{entry.output}</div>
          )}
        </>
      ))}

      <form onSubmit={onSubmit} className="flex flex-row space-x-2">
        <div className="flex-shrink">
          <Ps1 />
        </div>

        <input
          ref={inputRef}
          type="text"
          className="bg-gruvbox-background focus:outline-none flex-grow"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
        />
      </form>
    </div>
  );
};

export default IndexPage;
