import { FC } from 'react'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { useMethodsOfDefectFromDict } from '../../model/selectors/defect/useMethodsOfDefectFromDict'

type MethodsOfDefectSelectProps = {
    label?: string
    name: string
    defaultValue?: number
    helperText?: string
}

export const MethodsOfDefectSelect: FC<MethodsOfDefectSelectProps> = ({
    label = 'Метод устранения',
    helperText,
    defaultValue,
    name,
}) => {
    const methods = useMethodsOfDefectFromDict()
    return (
        <DefaultSelect
            defaultValue={defaultValue}
            options={methods}
            getOptionLabel={getOptionLabelFromName}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
