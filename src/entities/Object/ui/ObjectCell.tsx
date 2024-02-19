import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

type ObjectCellProps = {
    object: { id: number; name: string }
}

export const ObjectCell: FC<ObjectCellProps> = ({ object }) => {
    if (!object) {
        return '-'
    }

    return <Link to={ROUTES.object.cardGet(object.id)}>{object.name}</Link>
}
