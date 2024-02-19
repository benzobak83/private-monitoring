import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type StatusCellProps = {
    status: string
    method: string
}

export const StatusCell: FC<StatusCellProps> = ({ status, method }) => {
    return (
        <Stack>
            <Typography>{status}</Typography>
            {method && <Typography>({method})</Typography>}
        </Stack>
    )
}
