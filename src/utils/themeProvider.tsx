import React, { useEffect, useState } from 'react'
import Themes from '../../themes.json'
import type { Theme } from '../interfaces/theme'
import config from '../../config.json'

export interface ThemeContextType {
  setTheme: (name: string) => string
  theme: Theme
}

const ThemeContext = React.createContext<ThemeContextType>(null)

interface Props {
  children: React.ReactNode
}

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, _setTheme] = useState<Theme>(Themes[0])

  const setTheme = (name: string) => {
    const index = Themes.findIndex(
      colorScheme => colorScheme.name.toLowerCase() === name,
    )

    if (index === -1)
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`

    _setTheme(Themes[index])

    localStorage.setItem('theme', name)

    return `Theme ${Themes[index].name} set successfully!`
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    setTheme(savedTheme || config.theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
