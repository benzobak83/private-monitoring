import { Stack } from '@mui/material'
import { FC } from 'react'
import { useCompletingWorkContext } from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const CompletingWorkView: FC = () => {
    const { completingWork } = useCompletingWorkContext()

    return (
        <Stack>
            <ViewFieldPrimitiveValue
                label="Комментарий о выполненной работе"
                row={false}
                value={completingWork.comment}
            />
        </Stack>
    )
}
