import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $completingWork,
    $defect,
    $planningWork,
    DefectStageIds,
    getCompletingWorkFx,
    getPlanningWorkFx,
} from '@entities/Defect'
import { useInit } from '@shared/lib/hooks/useInit'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { CompletingWorkStageAsync } from '../../stages/CompletingWorkStage/CompletingWorkStage.async'
import { PlanningWorkStageAsync } from '../../stages/PlanningWorkStage/PlanningWorkStage.async'
import { WriteOffMaterialsStageAsync } from '../../stages/WriteOffMaterialsStage/WriteOffMaterialsStage.async'

const WorkWidget: FC = () => {
    const defect = useStore($defect)
    const planningWork = useStore($planningWork)
    const completingWork = useStore($completingWork)
    const getCompletingWorkFxIsLoading = useStore(getCompletingWorkFx.pending)
    const getPlanningWorkFxIsLoading = useStore(getPlanningWorkFx.pending)

    const { init } = useInit()

    if (init && (getCompletingWorkFxIsLoading || getPlanningWorkFxIsLoading)) {
        return <Loader heightValue={100} />
    }
    return (
        <Stack spacing={1.5}>
            {!!planningWork.length && <PlanningWorkStageAsync />}
            {!!completingWork.length && <CompletingWorkStageAsync />}
            {defect.stage.id === DefectStageIds.WRITE_OFF_MATERIALS && (
                <WriteOffMaterialsStageAsync />
            )}
        </Stack>
    )
}

export default WorkWidget
