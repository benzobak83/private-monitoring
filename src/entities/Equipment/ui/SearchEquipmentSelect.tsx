import { FC } from 'react'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { TSearchSelectProps } from '@shared/types/Form'
import { GetSearchSelect } from '@shared/ui/FormFields/Selects/GetSearchSelect/GetSearchSelect'

export const SearchEquipmentSelect: FC<TSearchSelectProps> = ({
    label = 'Оборудование',
    helperText,
    defaultValue,
    name,
}) => {
    return (
        <GetSearchSelect
            defaultValue={defaultValue}
            getOptionLabel={getOptionLabelFromName}
            searchUrl={ENDPOINTS.helpers.select.equipment}
            helperText={helperText}
            name={name}
            getData={(res) => res.data.data?.rows}
            label={label}
        />
    )
}
