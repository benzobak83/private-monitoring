import { Stack, Box } from '@mui/material'
import { FC } from 'react'
import { usePlanningWorkContext } from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const PlanningWorkView: FC = () => {
    const { planningWork } = usePlanningWorkContext()
    return (
        <Box>
            <Stack>
                <ViewFieldPrimitiveValue
                    label="Плановое начало работ"
                    value={planningWork.dateStart}
                />
                <ViewFieldPrimitiveValue
                    label="Плановое завершение работ"
                    value={planningWork.dateEnd}
                />
                <ViewFieldPrimitiveValue
                    label="Стоимость плановая"
                    isRub
                    value={planningWork.sum}
                />
            </Stack>
        </Box>
    )
}
