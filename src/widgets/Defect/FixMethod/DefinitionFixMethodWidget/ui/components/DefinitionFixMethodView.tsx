import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { $defect, useMethodContext } from '@entities/Defect'
import { useFixMethodTypeByIdFromDict } from '@entities/Dict'
import { FileList } from '@entities/File'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

type TDataAgreeWith = {
    id: number
    status: boolean
    label: string
}

export type TData = {
    userFullName: string
    descriptionFix: string
    cost: number | null
    agreeWith: TDataAgreeWith[]
}

export const DefinitionFixMethodView = () => {
    const defect = useStore($defect)

    const { method } = useMethodContext()

    const methodFromDict = useFixMethodTypeByIdFromDict(method?.method)

    return (
        <Stack spacing={1}>
            <ViewFieldPrimitiveValue
                label="Сотрудник выполнишвший осмотр"
                value={`${defect?.check?.user?.name} (${defect?.check?.createdAt})`}
            />
            <ViewFieldPrimitiveValue
                label="Метод устранения"
                value={methodFromDict?.name}
            />
            <ViewFieldPrimitiveValue
                label="Описание неисправности"
                value={method.comment}
            />
            {!!method.files?.length && (
                <FileList
                    label="Приложения"
                    files={method.files}
                    emptyText="Нету"
                />
            )}
        </Stack>
    )
}
