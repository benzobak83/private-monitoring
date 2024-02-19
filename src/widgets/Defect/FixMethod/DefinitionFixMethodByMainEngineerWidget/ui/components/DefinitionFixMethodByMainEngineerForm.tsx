import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    BuyNewEquipmentBtn,
    ContractOutBtn,
    TerminationOfOperationBtn,
} from '@/features/Defect/FixMethod/goToPlanningWork'
import { $fixMethodLast } from '@entities/Defect/model/getFixMethod'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'

export const DefinitionFixMethodByMainEngineerForm: FC = () => {
    const fixMethodLast = useStore($fixMethodLast)
    const { id } = useDefaultParams()
    return (
        <Stack direction="row" spacing={2}>
            <ContractOutBtn diagnosticId={fixMethodLast.id} defectId={id} />
            <TerminationOfOperationBtn
                diagnosticId={fixMethodLast.id}
                defectId={id}
            />
            <BuyNewEquipmentBtn diagnosticId={fixMethodLast.id} defectId={id} />
        </Stack>
    )
}
