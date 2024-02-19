import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'
import { TUser } from '../model/types'

type SearchUserSelectProps = {
    label?: string
    name: string
    defaultValue?: TUser | number | string
    helperText?: string
}

export const SearchUserSelect: FC<SearchUserSelectProps> = ({
    label = 'Пользователь',
    helperText,
    defaultValue,
    name,
}) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            searchUrl={ENDPOINTS.helpers.select.user}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
