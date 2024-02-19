import { Box } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@widgets/Header'
import { FullScreenModeController } from '@/features/General/enableFullScreenMode'

export const PageLayout: FC = () => {
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                position: 'relative',
                paddingLeft: '20px',
                margin: '0 auto',
                width: '100%',
            }}
        >
            <FullScreenModeController />
            <Header />
            <Outlet />
        </Box>
    )
}
