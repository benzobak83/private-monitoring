import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TIdWithName } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

type SearchTerritorySelectProps = {
    label?: string
    name: string
    defaultValue?: TIdWithName | number | string
    helperText?: string
}

export const SearchTerritorySelect: FC<SearchTerritorySelectProps> = ({
    label = 'Территория',
    helperText,
    defaultValue,
    name,
}) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            searchUrl={ENDPOINTS.helpers.select.territory}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
