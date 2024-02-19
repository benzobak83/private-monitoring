import { FC } from 'react'
import { Logger } from '@shared/notification'
import { AppRouter } from './config/routeConfig'
import ErrorBoundary from './providers/ErrorBoundary/ui/ErrorBoundary'
import { MyThemeProvider } from './providers/ThemeProvider'
import '@shared/styles/index.scss'

export const App: FC = () => {
    return (
        <ErrorBoundary>
            <MyThemeProvider>
                <Logger />
                <AppRouter />
            </MyThemeProvider>
        </ErrorBoundary>
    )
}
