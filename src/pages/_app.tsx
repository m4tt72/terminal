import '../styles/global.css';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <div className="text-gruvboxlight-foreground dark:text-gruvboxdark-foreground min-w-max text-xs md:min-w-full md:text-base">
        <main className="bg-gruvboxlight-background dark:bg-gruvboxdark-background w-full h-full p-2">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default App;
