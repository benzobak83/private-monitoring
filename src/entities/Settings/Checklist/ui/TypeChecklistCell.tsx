import { Typography } from '@mui/material'
import { FC } from 'react'
import { ChecklistType } from '../model/types'

type TypeChecklistCellProps = {
    typeChecklist: { id: ChecklistType; name: string }
}

export const TypeChecklistCell: FC<TypeChecklistCellProps> = ({
    typeChecklist,
}) => {
    return <Typography>{typeChecklist.name}</Typography>
}
