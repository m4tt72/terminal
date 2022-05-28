import React from 'react';
import { useTheme } from '../../utils/themeProvider';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Layout: React.FC<Props> = ({ children, onClick }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`text-${theme}-foreground dark:text-${theme}-foreground min-w-max text-xs md:min-w-full md:text-base`}
      onClick={onClick}
    >
      <main
        className={`${theme}-background dark:${theme}-background w-full h-full p-2`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
