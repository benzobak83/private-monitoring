import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

type DefectCellProps = {
    defectId: number
}

export const DefectCell: FC<DefectCellProps> = ({ defectId }) => {
    if (!defectId) {
        return '-'
    }

    return <Link to={ROUTES.defect.cardGet(defectId)}>№{defectId}</Link>
}
