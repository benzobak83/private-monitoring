import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { $defect, $planningWork, DefectStageIds } from '@entities/Defect'
import { $fixMethod } from '@entities/Defect/model/getFixMethod'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { FixMethodStageViewAsync } from '../stages/FixMethodStage/view/FixMethodStageView.async'
import { WriteOffMaterialsStageViewAsync } from '../stages/WriteOffMaterialsStage/view/WriteOffMaterialsStage.async'

export const StageHistory: FC = () => {
    const defect = useStore($defect)
    const fixMethod = useStore($fixMethod)
    const planningWork = useStore($planningWork)

    return (
        <MyPaper
            title="История"
            accordion={defect.stage.id !== DefectStageIds.COMPLETED}
        >
            <Stack spacing={1}>
                {defect?.stage?.id > DefectStageIds.FIX_METHOD &&
                    !!fixMethod.length && <FixMethodStageViewAsync />}
                {defect.stage?.id > DefectStageIds.WRITE_OFF_MATERIALS &&
                    !!planningWork.length && (
                        <WriteOffMaterialsStageViewAsync />
                    )}
            </Stack>
        </MyPaper>
    )
}
