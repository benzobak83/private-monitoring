import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

export const WorkNotStarted: FC = () => {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h3">Работа на объекте:</Typography>
                <Typography variant="h3">не начата</Typography>
            </Stack>
        </Stack>
    )
}
