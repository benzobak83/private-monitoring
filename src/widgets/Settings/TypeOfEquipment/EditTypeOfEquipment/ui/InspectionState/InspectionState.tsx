import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { SearchChecklistInspectionSelect } from '@entities/Settings/ChecklistInspection'
import {
    $typeOfEquipment,
    REGULARLY_CONTROL_OPTIONS,
    TYPE_CONTROL_OPTIONS,
} from '@entities/Settings/TypesOfEquipment'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { StandartRadio } from '@shared/ui/FormFields/StandartRadio/StandartRadio'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { TNamespace } from '../../model/types'
import { FillingDataBlock } from '../FillingDataBlock/FillingDataBlock'

const NAMESPACE: TNamespace = 'checklistInspection'

export const InspectionState: FC = () => {
    const typeOfEquipment = useStore($typeOfEquipment)

    return (
        <MyPaper title="Проверка состояния" sx={{ flexBasis: '50%' }}>
            <Stack spacing={2}>
                <SearchChecklistInspectionSelect
                    defaultValue={
                        typeOfEquipment.checklistInspection?.[0]?.checklist
                    }
                    name={NAMESPACE + '.checklistId'}
                />

                <StandartRadio
                    name={`${NAMESPACE}.isRegular`}
                    options={REGULARLY_CONTROL_OPTIONS}
                    type="boolean"
                    defaultValue={
                        typeOfEquipment.checklistInspection?.[0]?.isRegular
                    }
                    getOptionValue={(option) => option.value}
                    row
                    label="Метод проверки"
                />
                <StandartRadio
                    name={`${NAMESPACE}.typeControl`}
                    options={TYPE_CONTROL_OPTIONS}
                    type="number"
                    defaultValue={
                        typeOfEquipment.checklistInspection?.[0]?.typeControl
                    }
                    getOptionLabel={getOptionLabelFromName}
                    getOptionValue={(option) => Number(option.id)}
                    row
                    label="Тип проверки"
                />
                <FillingDataBlock namespace={NAMESPACE} />
            </Stack>
        </MyPaper>
    )
}
