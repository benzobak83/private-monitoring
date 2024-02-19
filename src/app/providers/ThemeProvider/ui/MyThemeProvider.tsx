import { ThemeProvider } from '@mui/material'
import { FC, ReactNode } from 'react'
import { theme } from '../model/theme'

type MyThemeProviderProps = {
    children: ReactNode
}

export const MyThemeProvider: FC<MyThemeProviderProps> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
