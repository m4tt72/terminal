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

      <div className="text-gruvbox-foreground">
        <main className="bg-gruvbox-background w-full h-full p-2">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
};

export default App;
