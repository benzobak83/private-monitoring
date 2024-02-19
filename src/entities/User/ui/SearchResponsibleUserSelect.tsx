import { AutocompleteProps } from '@mui/material'
import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

type SearchResponsibleUserSelectProps = Partial<
    AutocompleteProps<unknown, any, any, any>
> & { name: string; helperText?: string; label?: string }

export const SearchResponsibleUserSelect: FC<
    SearchResponsibleUserSelectProps
> = ({ label = 'МОЛ', helperText, defaultValue, name }) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            searchUrl={ENDPOINTS.helpers.select.responsibleUser}
            withoutResearch
            helperText={helperText}
            getOptionValue={(option) => option.uuid}
            name={name}
            label={label}
            filterOptions={undefined}
        />
    )
}
