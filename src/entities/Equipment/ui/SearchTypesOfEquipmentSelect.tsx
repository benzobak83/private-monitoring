import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { TIdWithName } from '@shared/types/Global'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

type SearchTypesOfEquipmentSelectProps = {
    label?: string
    name: string
    defaultValue?: TIdWithName | number | string
    helperText?: string
}

export const SearchTypesOfEquipmentSelect: FC<
    SearchTypesOfEquipmentSelectProps
> = ({ label = 'Тип оборудования', helperText, defaultValue, name }) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            getOptionLabel={getOptionLabelFromName}
            searchUrl={ENDPOINTS.helpers.select.typeOfEquipment}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
