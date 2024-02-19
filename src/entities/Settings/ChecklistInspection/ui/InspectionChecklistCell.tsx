import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

type InspectionChecklistCellProps = {
    checklist: { id: number; name: string }
}

export const InspectionChecklistCell: FC<InspectionChecklistCellProps> = ({
    checklist,
}) => {
    return (
        <Link to={ROUTES.settings.inspectionChecklistItemGet(checklist.id)}>
            {checklist.name}
        </Link>
    )
}
