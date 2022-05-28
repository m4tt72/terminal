import React, { useState } from 'react';
import Themes from '../../themes.json';

export interface ThemeContextType {
  setTheme: (name: string) => string;
  theme: string;
}

const ThemeContext = React.createContext<ThemeContextType>(null);

interface Props {
  children: React.ReactNode;
}

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, _setTheme] = useState<string>(Themes[0].name.toLowerCase());

  const setTheme = (name: string) => {
    const index = Themes.findIndex(
      (colorScheme) => colorScheme.name.toLowerCase() === name,
    );

    if (index === -1) {
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`;
    }

    _setTheme(name);

    return `Theme ${Themes[index].name} set successfully!`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
