import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TIdWithName } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

type SearchDirectionActivitySelectProps = {
    label?: string
    name: string
    defaultValue?: TIdWithName | number | string
    helperText?: string
}

export const SearchDirectionActivitySelect: FC<
    SearchDirectionActivitySelectProps
> = ({ label = 'Вид деятельности', helperText, defaultValue, name }) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            searchUrl={ENDPOINTS.helpers.select.directionActivity}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
