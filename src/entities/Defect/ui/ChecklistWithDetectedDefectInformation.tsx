import { Stack } from '@mui/material'
import { FC } from 'react'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { getDefectOptionName } from '../lib/defectOptions'
import { DefectTypeIds } from '../model/types/types'

const MOCK_DEFECT_ID = DefectTypeIds.WARNING

export const ChecklistWithDetectedDefectInformation: FC = () => {
    return (
        <MyPaper title="Чеклист">
            <Stack spacing={0.5}>
                <ViewFieldPrimitiveValue
                    label="Название"
                    value={'проверка насосного оборудования №4'}
                />
                <ViewFieldPrimitiveValue
                    label="Дата"
                    value={'00-00-0000 00:00 (Иванов И.И.)'}
                />
                <ViewFieldPrimitiveValue
                    label="Комментарий"
                    value={
                        'Текст комментария из чеклиста по которому выявили неисправность.'
                    }
                />
                <ViewFieldPrimitiveValue
                    label="Тип неисправности"
                    value={getDefectOptionName(MOCK_DEFECT_ID)}
                />
            </Stack>
        </MyPaper>
    )
}
