import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return (
    <div className="text-gruvbox-foreground">
      <main className="bg-gruvbox-background w-full h-screen p-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;
