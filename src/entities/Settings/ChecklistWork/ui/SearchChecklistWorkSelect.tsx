import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { TIdWithName } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'
import { ChecklistType } from '../../Checklist'

type SearchChecklistWorkSelectProps = {
    name: string
    label?: string
    defaultValue?: TIdWithName
    helperText?: string
}

const searchParams = {
    typeChecklist: ChecklistType.WORKS,
}

export const SearchChecklistWorkSelect: FC<SearchChecklistWorkSelectProps> = ({
    label = 'Чеклист регламентных работ',
    defaultValue,
    helperText,
    name,
}) => {
    return (
        <GetSearchSelect
            searchUrl={ENDPOINTS.settings.checklist.getForSelect}
            getOptionLabel={getOptionLabelFromName}
            searchParams={searchParams}
            defaultValue={defaultValue}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
