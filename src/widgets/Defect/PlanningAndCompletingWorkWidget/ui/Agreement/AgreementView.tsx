import { Stack } from '@mui/material'
import { FC } from 'react'
import { usePlanningWorkContext } from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const AgreementView: FC = () => {
    const { planningWork } = usePlanningWorkContext()
    return (
        <Stack>
            <ViewFieldPrimitiveValue
                label="Согласовано с лимитом"
                isRub
                value={planningWork?.agreement?.sum}
            />
            <ViewFieldPrimitiveValue
                label="Согласовал"
                value={planningWork?.agreement?.user?.name}
            />
            <ViewFieldPrimitiveValue
                label="Комментарий"
                value={planningWork?.agreement?.comment}
                row={false}
            />
        </Stack>
    )
}
