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

      <div className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base">
        <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default App;
