import LensIcon from '@mui/icons-material/Lens'
import { Box, Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import { getColorByResult } from '../lib/getColorByResult'
import { ResultCheckIds } from '../model/types/types'

type ResultOfCheckProps = {
    typeResult: ResultCheckIds
    count?: number
    sx?: SxProps<Theme>
    iconSx?: SxProps<Theme>
}

export const ResultOfCheck: FC<ResultOfCheckProps> = ({
    typeResult,
    count,
    sx = {},
    iconSx = {},
}) => {
    if (!typeResult) {
        return '-'
    }
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                minWidth: '31px',
                ...sx,
            }}
        >
            {typeof count === 'number' && count >= 0 && (
                <Typography
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                    }}
                >
                    {count}
                </Typography>
            )}
            <LensIcon
                color={getColorByResult(typeResult)}
                fontSize="large"
                sx={iconSx}
            />
        </Box>
    )
}
