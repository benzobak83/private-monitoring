import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type CommentCellProps = {
    user: string
    comment: string
}

export const CommentCell: FC<CommentCellProps> = ({ user, comment }) => {
    return (
        <Stack>
            <Typography variant="h6">{user}</Typography>
            <Typography>{comment}</Typography>
        </Stack>
    )
}
