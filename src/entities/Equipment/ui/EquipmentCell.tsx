import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

type EquipmentCellProps = {
    equipment: { id: number; name: string }
}

export const EquipmentCell: FC<EquipmentCellProps> = ({ equipment }) => {
    if (!equipment) {
        return '-'
    }

    return (
        <Link to={ROUTES.equipment.cardGet(equipment.id)}>
            {equipment.name}
        </Link>
    )
}
