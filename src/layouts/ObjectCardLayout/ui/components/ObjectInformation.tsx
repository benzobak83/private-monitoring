import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { $objectItem } from '@entities/Object'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

const stackSx = { maxWidth: '400px' }

export const ObjectInformation: FC = () => {
    const object = useStore($objectItem)

    return (
        <Stack
            direction="row"
            spacing={3}
            alignItems="flex-start"
            sx={{ overflow: 'auto' }}
        >
            <Stack spacing={1} sx={stackSx}>
                <ViewFieldPrimitiveValue
                    label="Сейчас в работе"
                    noWrap
                    value={object.work?.user?.name}
                    emptyText="Ни у кого"
                />
                <ViewFieldPrimitiveValue
                    label="Направление"
                    noWrap
                    value={object?.direction?.name}
                />
            </Stack>
            <Stack spacing={1} sx={stackSx}>
                <ViewFieldPrimitiveValue
                    label="Вид деятельности"
                    noWrap
                    value={object?.activity?.name}
                />
                <ViewFieldPrimitiveValue
                    label="Территория"
                    value={object?.territory?.name}
                    noWrap
                />
            </Stack>
            <Stack spacing={1} sx={stackSx}>
                <ViewFieldPrimitiveValue
                    label="Подразделение"
                    value={object?.subdivision?.name}
                    noWrap
                />
                <ViewFieldPrimitiveValue
                    label="Начальник подразделения"
                    value={object?.user?.name}
                    noWrap
                />
            </Stack>
        </Stack>
    )
}
