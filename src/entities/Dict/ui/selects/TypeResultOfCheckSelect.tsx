import { FC } from 'react'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { useTypeResultOfCheckFromDict } from '../../model/selectors/check/useTypeResultOfCheckFromDict'

type TypeResultOfCheckSelectProps = {
    label?: string
    name: string
    defaultValue?: number
    helperText?: string
}

export const TypeResultOfCheckSelect: FC<TypeResultOfCheckSelectProps> = ({
    label = 'Результат проверки',
    helperText,
    defaultValue,
    name,
}) => {
    const typeResults = useTypeResultOfCheckFromDict()
    return (
        <DefaultSelect
            defaultValue={defaultValue}
            options={typeResults}
            getOptionLabel={getOptionLabelFromName}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
