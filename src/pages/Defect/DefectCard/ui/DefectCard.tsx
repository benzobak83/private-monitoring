import { Box, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, ReactElement, useEffect } from 'react'
import {
    $completingWork,
    $defect,
    $planningWork,
    DefectStageIds,
    getCompletingWorkFx,
    getPlanningWorkFx,
    resetCompletingWork,
    resetPlanningWork,
} from '@entities/Defect'
import {
    $fixMethod,
    getFixMethodFx,
    resetFixMethod,
} from '@entities/Defect/model/getFixMethod'
import { getMaterialsActs } from '@entities/Material'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useInit } from '@shared/lib/hooks/useInit'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { SuspenseLoader } from '@shared/ui/suspenses/SuspenseLoader'
import { StageHistory } from './components/StageHistory'
import { WorkWidgetAsync } from './components/WorkWidget/WorkWidget.async'
import { BuyNewStageAsync } from './stages/BuyNewStage/BuyNewStage.async'
import { CompletedStageAsync } from './stages/CompletedStage/CompletedStage.async'
import { FixMethodStageAsync } from './stages/FixMethodStage/FixMethodStage.async'

const STAGES: Record<Partial<DefectStageIds>, ReactElement> = {
    [DefectStageIds.FIX_METHOD]: <FixMethodStageAsync />,
    [DefectStageIds.PLANNING_WORK]: <WorkWidgetAsync />,
    [DefectStageIds.COMPLETING_WORK]: <WorkWidgetAsync />,
    [DefectStageIds.BUY_NEW]: <BuyNewStageAsync />,
    [DefectStageIds.WRITE_OFF_MATERIALS]: <WorkWidgetAsync />,
    [DefectStageIds.COMPLETED]: <CompletedStageAsync />,
}

//компонент используется внутри layouts -> DefectCardLayout
const DefectCard: FC = () => {
    const defect = useStore($defect)
    const planningWork = useStore($planningWork)
    const completingWork = useStore($completingWork)
    const fixMethod = useStore($fixMethod)

    const getFixMethodFxIsLoading = useStore(getFixMethodFx.pending)
    const getPlanningWorkFxIsLoading = useStore(getPlanningWorkFx.pending)
    const getCompletingWorkFxIsLoadig = useStore(getCompletingWorkFx.pending)
    const getMaterialsActsIsLoading = useStore(getMaterialsActs.pending)

    const { init } = useInit()

    const { id } = useDefaultParams()

    useEffect(() => {
        ;(!fixMethod.length || defect.stage?.id === DefectStageIds.COMPLETED) &&
            getFixMethodFx(id)

        if (defect?.stage?.id >= DefectStageIds.PLANNING_WORK) {
            !planningWork.length && getPlanningWorkFx(id)
        }
        if (defect?.stage?.id >= DefectStageIds.COMPLETING_WORK) {
            !completingWork.length && getCompletingWorkFx(id)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, defect.stage])

    useEffect(() => {
        return () => {
            resetPlanningWork()
            resetCompletingWork()
            resetFixMethod()
        }
    }, [])

    const isLoading =
        getFixMethodFxIsLoading ||
        getPlanningWorkFxIsLoading ||
        getCompletingWorkFxIsLoadig ||
        getMaterialsActsIsLoading

    if (init && isLoading) {
        return <Loader heightValue={100} />
    }

    return (
        <SuspenseLoader>
            <Stack spacing={2} sx={{ maxWidth: '800px' }}>
                {defect?.stage?.id > DefectStageIds.FIX_METHOD && (
                    <StageHistory />
                )}
                <Box mb={2}>{STAGES[defect?.stage?.id]}</Box>
            </Stack>
        </SuspenseLoader>
    )
}
export default DefectCard
