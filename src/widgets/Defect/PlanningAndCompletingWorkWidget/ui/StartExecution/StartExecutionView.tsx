import { Stack } from '@mui/material'
import { FC } from 'react'
import {
    useCompletingWorkContext,
    usePlanningWorkContext,
} from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const StartExecutionView: FC = () => {
    const { completingWork } = useCompletingWorkContext()
    const { planningWork } = usePlanningWorkContext()
    return (
        <Stack>
            <ViewFieldPrimitiveValue
                label="Работы начаты"
                value={completingWork.dateStart}
            />
            {!!completingWork.dateEnd ? (
                <ViewFieldPrimitiveValue
                    label="Работы завершены"
                    value={completingWork.dateEnd}
                />
            ) : (
                <ViewFieldPrimitiveValue
                    label="Плановое завершение работ"
                    value={planningWork.dateEnd}
                />
            )}
        </Stack>
    )
}
