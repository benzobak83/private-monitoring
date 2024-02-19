import { FC } from 'react'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { useDefectStageFromDict } from '../../model/selectors/defect/useDefectStageFromDict'

type DefectStageSelectProps = {
    label?: string
    name: string
    defaultValue?: number
    helperText?: string
}

export const DefectStageSelect: FC<DefectStageSelectProps> = ({
    label = 'Стадия неисправности',
    helperText,
    defaultValue,
    name,
}) => {
    const defectStages = useDefectStageFromDict()
    return (
        <DefaultSelect
            defaultValue={defaultValue}
            options={defectStages}
            getOptionLabel={getOptionLabelFromName}
            helperText={helperText}
            name={name}
            label={label}
        />
    )
}
