import { FC } from 'react'
import { useCompletingWorkContext } from '@entities/Defect'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const CompletingWorkByMasterView: FC = () => {
    const { completingWork } = useCompletingWorkContext()
    return (
        <ViewFieldPrimitiveValue
            label="Комментарий о выполненной работе"
            value={completingWork.comment}
            row={false}
        />
    )
}
