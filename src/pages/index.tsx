import React from 'react';
import Head from 'next/head';
import { Input } from '../components/input';
import { useHistory } from '../hooks/history';
import { History } from '../components/history';
import { NextPageContext } from 'next';
import packageJson from '../../package.json';
import { getQuote } from '../api';
import { shell } from '../utils/shell';
import { banner } from '../utils/bin';

const IndexPage: React.FC<{ version: string; quote: string }> = ({
  version,
  quote,
}) => {
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const { history, command, setCommand, setHistory, clearHistory } = useHistory(
    [],
  );

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'l' && event.ctrlKey) {
      clearHistory();
    }

    if (event.key === 'Enter' || event.code === '13') {
      await shell(history, command, setHistory, clearHistory, setCommand);

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

      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full">
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
  const { quote } = await getQuote();

  return {
    props: {
      version: packageJson.version,
      quote,
    },
    revalidate: true,
  };
}

export default IndexPage;
