import { Typography, Chip } from '@mui/material'
import { FC } from 'react'
import { TUser } from '../model/types'

type UserCellProps = {
    user: TUser
    emptyText?: string
    warningAboutEmpty?: boolean
}

export const UserCell: FC<UserCellProps> = ({
    warningAboutEmpty,
    user = {},
    emptyText = '-',
}) => {
    if (!!user?.name) {
        return <Typography>{user.name}</Typography>
    }

    if (warningAboutEmpty) {
        return <Chip label={emptyText} size="small" color="error" />
    }

    return <Typography>{emptyText}</Typography>
}
