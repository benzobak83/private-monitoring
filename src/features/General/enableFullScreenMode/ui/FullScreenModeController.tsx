import { Box, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

export const FullScreenModeController: FC = () => {
    const { pathname } = useLocation()

    const fullScreenModeOn = useCallback(() => {
        window.open(pathname)
    }, [pathname])

    return (
        <Box sx={{ position: 'absolute', top: '-17px', right: '30px' }}>
            <Typography
                sx={{
                    color: 'grey',
                    fontSize: '10px',
                    cursor: 'pointer',
                    '&:hover': { color: 'blue' },
                }}
                onClick={fullScreenModeOn}
            >
                Включить полноэкранный режим
            </Typography>
        </Box>
    )
}
