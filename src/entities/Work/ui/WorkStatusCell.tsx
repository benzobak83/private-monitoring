import { Typography } from '@mui/material'
import { FC } from 'react'
import { successColor } from '@shared/styles/variables/_export.module.scss'
import { TWork } from '../model/types'

type WorkStatusCellProps = {
    work: TWork
}

export const WorkStatusCell: FC<WorkStatusCellProps> = ({ work }) => {
    if (work?.isWorkInProgress) {
        return <Typography>{work?.user?.name}</Typography>
    } else {
        return <Typography color={successColor}>Свободно</Typography>
    }
}
