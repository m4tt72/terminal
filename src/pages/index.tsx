import React from 'react';
import Ps1 from '../components/ps1';
import { interpreter } from '../utils/interpreter';
import { useHistory } from '../hooks/history';

const IndexPage: React.FC = () => {
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const { history, command, setCommand, setHistory, clearHistory } = useHistory(
    [],
  );

  const init = () => {
    setHistory(
      `
  __  __ _  _ _____ _____ _____ ____
 |  \\/  | || |_   _|_   _|___  |___ \\
 | |\\/| | || |_| |   | |    / /  __) |
 | |  | |__   _| |   | |   / /  / __/
 |_|  |_|  |_| |_|   |_|  /_/  |_____|

This website is currently under development, only few commands are available atm.
Type 'help' to see list of available commands.
`,
    );
  };

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.code === '13') {
      try {
        await interpreter(
          history,
          command,
          setHistory,
          clearHistory,
          setCommand,
        );
      } catch (error) {
        console.log({ error });
      }

      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className="p-8 overflow-hidden h-full border-2 rounded border-gruvbox-yellow">
      <div ref={containerRef} className="overflow-hidden h-full">
        {history.map((entry, index) => (
          <div key={entry.command + index}>
            <div className="flex flex-row space-x-2">
              <div className="flex-shrink">
                <Ps1 />
              </div>

              <div className="flex-grow">{entry.command}</div>
            </div>

            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: entry.output }}
            />
          </div>
        ))}

        <div className="flex flex-row space-x-2">
          <div className="flex-shrink">
            <Ps1 />
          </div>

          <input
            ref={inputRef}
            type="text"
            className="bg-gruvbox-background focus:outline-none flex-grow"
            value={command}
            onChange={onChange}
            autoFocus
            onKeyDown={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
