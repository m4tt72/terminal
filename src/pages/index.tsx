import React from 'react';
import Head from 'next/head';
import { Input } from '../components/input';
import { interpreter } from '../utils/interpreter';
import { useHistory } from '../hooks/history';
import { History } from '../components/history';
import { NextPageContext } from 'next';
import packageJson from '../../package.json';

const IndexPage: React.FC<{ version: string }> = ({ version }) => {
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const { history, command, setCommand, setHistory, clearHistory } = useHistory(
    [],
  );

  const init = React.useCallback(() => {
    setHistory(
      `
███╗   ███╗██╗  ██╗████████╗████████╗███████╗██████╗
████╗ ████║██║  ██║╚══██╔══╝╚══██╔══╝╚════██║╚════██╗
██╔████╔██║███████║   ██║      ██║       ██╔╝ █████╔╝
██║╚██╔╝██║╚════██║   ██║      ██║      ██╔╝ ██╔═══╝
██║ ╚═╝ ██║     ██║   ██║      ██║      ██║  ███████╗
╚═╝     ╚═╝     ╚═╝   ╚═╝      ╚═╝      ╚═╝  ╚══════╝ v${version}

Type 'help' to see list of available commands.
`,
    );
  }, []);

  React.useEffect(() => {
    init();
  }, [init]);

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
    <>
      <Head>
        <title>M4TT72 | Home</title>
      </Head>

      <div className="p-8 overflow-hidden h-full border-2 rounded border-gruvbox-yellow">
        <div ref={containerRef} className="overflow-hidden h-full">
          <History history={history} />

          <Input
            inputRef={inputRef}
            command={command}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      version: packageJson.version,
    }, // will be passed to the page component as props
  };
}

export default IndexPage;
