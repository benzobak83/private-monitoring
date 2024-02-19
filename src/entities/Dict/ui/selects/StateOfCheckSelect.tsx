import { FC } from 'react'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { useStateOfCheckFromDict } from '../../model/selectors/check/useStateOfCheckFromDict'

type StateOfCheckSelectProps = {
    label?: string
    name: string
    defaultValue?: number
    helperText?: string
}

export const StateOfCheckSelect: FC<StateOfCheckSelectProps> = ({
    label = 'Статус проверки',
    helperText,
    defaultValue,
    name,
}) => {
    const states = useStateOfCheckFromDict()
    return (
        <DefaultSelect
            defaultValue={defaultValue}
            options={states}
            getOptionLabel={getOptionLabelFromName}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
