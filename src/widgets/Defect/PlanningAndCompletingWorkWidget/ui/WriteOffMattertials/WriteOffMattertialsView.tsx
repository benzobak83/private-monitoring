import { Stack } from '@mui/material'
import { FC } from 'react'
import { TMaterialsActOfObjectByCompletingId } from '@entities/Material'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

type WriteOffMattertialsViewProps = {
    materialAct: TMaterialsActOfObjectByCompletingId
}
export const WriteOffMattertialsView: FC<WriteOffMattertialsViewProps> = ({
    materialAct,
}) => {
    return (
        <Stack>
            <ViewFieldPrimitiveValue
                label="Выбран акт"
                value={`Акт №${materialAct.number} от ${materialAct.date} на сумму ${materialAct.sum}р`}
            />
        </Stack>
    )
}
