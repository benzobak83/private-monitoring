import { Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import {
    $completingWork,
    $defect,
    CompletingWorkProvider,
    PlanningWorkProvider,
    DefectWorkStageIds,
    TPlanningWork,
    getPlanningWorkById,
} from '@entities/Defect'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { getWorkWidget } from '../../lib/getWorkWidget'

const WriteOffMaterialsStage: FC = () => {
    const defect = useStore($defect)

    const completingWork = useStore($completingWork)

    const completingWorkWithCompletingState = useMemo(() => {
        return completingWork.filter(
            (work) => work?.state === DefectWorkStageIds.COMPLETING
        )
    }, [completingWork])

    return (
        <Stack spacing={1.5}>
            <TitlePage>Списание материлов</TitlePage>
            <Divider />
            {completingWorkWithCompletingState.map((item) => {
                return (
                    <PlanningWorkProvider
                        key={item.id}
                        planningWork={
                            getPlanningWorkById(
                                item.planningId
                            ) as TPlanningWork
                        }
                    >
                        <CompletingWorkProvider completingWork={item}>
                            {getWorkWidget(
                                defect?.method?.id,
                                'writeOffMaterials'
                            )}
                        </CompletingWorkProvider>
                    </PlanningWorkProvider>
                )
            })}
        </Stack>
    )
}
export default WriteOffMaterialsStage
