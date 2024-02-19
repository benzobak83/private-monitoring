import { Stack } from '@mui/material'
import { FC } from 'react'
import { useCompletingWorkContext } from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const WorkDecisionByResponsiblePersonView: FC = () => {
    const { completingWork } = useCompletingWorkContext()
    return (
        <Stack spacing={0.5}>
            <ViewFieldPrimitiveValue
                label="Работы приняты"
                value={completingWork?.dateEnd}
            />
        </Stack>
    )
}
