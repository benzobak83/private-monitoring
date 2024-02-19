import { Paper, Stack, Typography } from '@mui/material'
import { FC, ReactNode, memo } from 'react'

type ErrorPopupProps = {
    title: string
    text: string
    children?: ReactNode
}

export const ErrorPopup: FC<ErrorPopupProps> = memo(
    ({ title, text, children }) => {
        return (
            <Stack
                sx={{ width: '100%', height: '90vh' }}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Paper sx={{ padding: '40px' }}>
                    <Stack alignItems="center" spacing="20px">
                        <Typography variant="h2">{title}</Typography>
                        <Typography variant="h5">{text}</Typography>
                        {children}
                    </Stack>
                </Paper>
            </Stack>
        )
    }
)
