import { Typography } from '@mui/material'
import { FC } from 'react'

type ObjectOrEquipmentCellProps = {
    equipment: string | undefined
}

export const ObjectOrEquipmentCell: FC<ObjectOrEquipmentCellProps> = ({
    equipment,
}) => {
    if (equipment) {
        return <Typography>{equipment}</Typography>
    } else {
        return <Typography>Данный объект</Typography>
    }
}
