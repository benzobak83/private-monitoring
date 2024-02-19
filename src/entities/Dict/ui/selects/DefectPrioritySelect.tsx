import { FC } from 'react'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { usePriorityFromDict } from '../../model/selectors/defect/usePriorityFromDict'

type DefectPrioritySelectProps = {
    label?: string
    name: string
    defaultValue?: number
    helperText?: string
}

export const DefectPrioritySelect: FC<DefectPrioritySelectProps> = ({
    label = 'Приоритет',
    helperText,
    defaultValue,
    name,
}) => {
    const defectPriority = usePriorityFromDict()

    return (
        <DefaultSelect
            defaultValue={defaultValue}
            options={defectPriority}
            getOptionLabel={(option) => option.id}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
