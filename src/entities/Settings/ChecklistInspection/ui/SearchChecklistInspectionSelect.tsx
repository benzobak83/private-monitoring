import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { TIdWithName } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'
import { ChecklistType } from '../../Checklist'

type SearchChecklistInspectionSelectProps = {
    name: string
    label?: string
    helperText?: string
    defaultValue?: TIdWithName
}

const searchParams = {
    typeChecklist: ChecklistType.INSPECTION,
}

export const SearchChecklistInspectionSelect: FC<
    SearchChecklistInspectionSelectProps
> = ({
    label = 'Чеклист осмотров и проверок',
    defaultValue,
    name,
    helperText,
}) => {
    return (
        <GetSearchSelect
            searchUrl={ENDPOINTS.settings.checklist.getForSelect}
            getOptionLabel={getOptionLabelFromName}
            helperText={helperText}
            defaultValue={defaultValue}
            searchParams={searchParams}
            name={name}
            label={label}
        />
    )
}
