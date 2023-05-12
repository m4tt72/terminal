import { createInstance, MatomoProvider } from '@m4tt72/matomo-tracker-react';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Layout } from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';

interface AppProps {
  Component: React.FC<any>;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef?.current && inputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem('visitedAt', new Date().toString());
  }, []);

  return (
    <ThemeProvider>
      <ShellProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>

        <Layout onClick={onClickAnywhere}>
          <Component {...pageProps} inputRef={inputRef} />
        </Layout>
      </ShellProvider>
    </ThemeProvider>
  );
};

export default (props: AppProps) => {
  const ENABLE_TRACKING = Boolean(
    +(process.env.NEXT_PUBLIC_ENABLE_TRACKING as string),
  );

  if (!ENABLE_TRACKING) {
    return <App {...props} />;
  }

  const instance = createInstance({
    urlBase: process.env.NEXT_PUBLIC_TRACKING_URL as string,
    trackerUrl: `${process.env.NEXT_PUBLIC_TRACKING_URL}/js/` as string,
    srcUrl: `${process.env.NEXT_PUBLIC_TRACKING_URL}/js/` as string,
    siteId: +(process.env.NEXT_PUBLIC_TRACKING_SITE_ID as string),
    configurations: {
      setRequestMethod: 'GET',
    },
  });

  return (
    <MatomoProvider value={instance}>
      <App {...props} />
    </MatomoProvider>
  );
};
