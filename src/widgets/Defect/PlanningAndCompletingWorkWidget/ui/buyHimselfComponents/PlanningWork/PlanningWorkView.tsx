import { Stack } from '@mui/material'
import { FC } from 'react'
import { usePlanningWorkContext } from '@entities/Defect/model/providers/PlanningWorkProvider'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const PlanningWorkView: FC = () => {
    const { planningWork } = usePlanningWorkContext()
    return (
        <Stack>
            <ViewFieldPrimitiveValue
                label="Плановое начало работ"
                value={planningWork?.dateStart}
            />
            <ViewFieldPrimitiveValue
                label="Плановое завершение работ"
                value={planningWork?.dateEnd}
            />
        </Stack>
    )
}
