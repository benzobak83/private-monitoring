import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'
import { TIdWithName } from '@shared/types/Global'

type ChecklistWorkCellProps = {
    checklist: TIdWithName
}

export const ChecklistWorkCell: FC<ChecklistWorkCellProps> = ({
    checklist,
}) => {
    return (
        <Link to={ROUTES.settings.worksChecklistItemGet(checklist.id)}>
            {checklist.name}
        </Link>
    )
}
