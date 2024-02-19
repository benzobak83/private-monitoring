import { FC } from 'react'
import { useMethodContext } from '@entities/Defect'
import { useFixMethodTypeByIdFromDict } from '@entities/Dict'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const DefinitionFixMethodByMainEngineerView: FC = () => {
    const { method } = useMethodContext()
    const methodFromDict = useFixMethodTypeByIdFromDict(method.method)
    return (
        <ViewFieldPrimitiveValue label="Решение" value={methodFromDict?.name} />
    )
}
