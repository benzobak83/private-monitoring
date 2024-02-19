import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TIdWithLabel } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

type SearchSubdivisionSelectProps = {
    name: string
    helperText?: string
    label?: string
    defaultValue?: TIdWithLabel | number
}
//TODO: нужен поиск по id
export const SearchSubdivisionSelect: FC<SearchSubdivisionSelectProps> = ({
    name,
    helperText,
    label = 'Подразделение',
    defaultValue,
}) => {
    return (
        <GetSearchSelect
            searchUrl={ENDPOINTS.helpers.select.subdivision}
            helperText={helperText}
            defaultValue={defaultValue}
            name={name}
            label={label}
        />
    )
}
