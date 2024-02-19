import { CircularProgress, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { FC, memo } from 'react'

const stackSx = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000,
}

const paperSx = {
    boxSizing: 'border-box',
    width: '140px',
    height: '140px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px grey',
    textAlign: 'center',
    padding: '60px',
}

type WidgetLoadingProps = {
    label?: string
}

export const WidgetLoading: FC<WidgetLoadingProps> = memo(({ label }) => {
    return (
        <Stack sx={stackSx}>
            <Paper sx={paperSx}>
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing="20px"
                >
                    <CircularProgress />
                    {label && (
                        <Typography variant="caption">{label}</Typography>
                    )}
                </Stack>
            </Paper>
        </Stack>
    )
})
