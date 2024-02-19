import { Box, LinearProgress } from '@mui/material'
import { memo } from 'react'
import { createPortal } from 'react-dom'

export const LoadingLinear = memo(() => {
    return createPortal(
        <Box
            sx={{
                position: 'fixed',
                top: '0px',
                minWidth: '100%',
            }}
        >
            <LinearProgress />
        </Box>,
        document.querySelector('body') as HTMLElement
    )
})
