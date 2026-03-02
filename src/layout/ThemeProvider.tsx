import type { ReactNode } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { ThemeProvider as ThemeContextProvider, useTheme } from '../services/themeContext'

interface ThemeProviderProps {
  children: ReactNode
}

function ThemeConfigProvider({ children }: ThemeProviderProps) {
  const { theme: mode } = useTheme()

  const algorithm = mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm

  return <ConfigProvider theme={{ algorithm }}>{children}</ConfigProvider>
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContextProvider>
      <ThemeConfigProvider>{children}</ThemeConfigProvider>
    </ThemeContextProvider>
  )
}
