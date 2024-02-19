import { Typography } from '@mui/material'
import { FC, memo } from 'react'

export const RequiredSymbol: FC = memo(() => {
    return (
        <Typography
            sx={{
                position: 'absolute',
                left: '-3px',
                top: '-8px',
                color: 'red',
                fontSize: '18px',
            }}
        >
            *
        </Typography>
    )
})
