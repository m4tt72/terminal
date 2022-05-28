import { useMatomo } from '@m4tt72/matomo-tracker-react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';
import packageJson from '../../package.json';
import { getQuote } from '../api';
import { History } from '../components/history';
import { Input } from '../components/input';
import { useShell } from '../utils/shellProvider';
import { useTheme } from '../utils/themeProvider';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const { trackPageView } = useMatomo();
  const { history } = useShell();
  const { theme } = useTheme();

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    trackPageView({});
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>M4TT72 | Home</title>
      </Head>

      <div
        className={`p-8 overflow-hidden h-full border-2 rounded border-${theme}-brightRed dark:border-${theme}-red`}
      >
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
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
