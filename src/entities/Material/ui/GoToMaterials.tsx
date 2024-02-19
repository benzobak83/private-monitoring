import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'

type goToMaterialsProps = {
    defectId: number
    approvalId: number
}

export const GoToMaterials: FC<goToMaterialsProps> = () => {
    return (
        <Link
            style={{
                fontSize: '12px',
                textAlign: 'center',
            }}
            to={ROUTES.defect.materialsList}
        >
            Материалы на 10 счете
        </Link>
    )
}
