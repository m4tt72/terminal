import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return (
    <div className="text-gruvbox-foreground">
      <main className="bg-gruvbox-background w-full h-full p-2">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;
