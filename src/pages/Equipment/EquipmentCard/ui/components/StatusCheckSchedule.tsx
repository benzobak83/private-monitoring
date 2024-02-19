import { Stack } from '@mui/material'
import { FC } from 'react'
import { TChecklistOfTypeOfEquipment } from '@entities/Settings/TypesOfEquipment'
import { ROUTES } from '@shared/lib/consts/routes'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

type StatusCheckScheduleProps = {
    checklist: TChecklistOfTypeOfEquipment
}

export const StatusCheckSchedule: FC<StatusCheckScheduleProps> = ({
    checklist,
}) => {
    return (
        <Stack spacing={0.5}>
            <ViewFieldPrimitiveValue
                label="Чеклист"
                value={checklist?.name}
                link={ROUTES.settings.inspectionChecklistItemGet(checklist?.id)}
            />
            <ViewFieldPrimitiveValue
                label="Регулярность"
                value={checklist?.description}
            />
        </Stack>
    )
}
