import { Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $completingWork,
    $defect,
    CompletingWorkProvider,
    PlanningWorkProvider,
    DefectWorkStageIds,
    getPlanningWorkById,
} from '@entities/Defect'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { getWorkWidget } from '../../lib/getWorkWidget'

const CompletingWorkStage: FC = () => {
    const defect = useStore($defect)

    const completingWork = useStore($completingWork)

    const filteredCompletingWorks = completingWork.filter(
        (completingWork) =>
            completingWork.state !== DefectWorkStageIds.COMPLETING
    )

    if (!filteredCompletingWorks.length) return null
    return (
        <Stack spacing={1.5}>
            <TitlePage>Выполнение работ</TitlePage>
            <Divider />
            {filteredCompletingWorks.map((item) => {
                const planningWork = getPlanningWorkById(item.planningId)

                if (!planningWork?.id) {
                    return null
                }
                return (
                    <PlanningWorkProvider
                        key={item.id}
                        planningWork={planningWork}
                    >
                        <CompletingWorkProvider completingWork={item}>
                            {getWorkWidget(defect?.method?.id, 'completing')}
                        </CompletingWorkProvider>
                    </PlanningWorkProvider>
                )
            })}
        </Stack>
    )
}
export default CompletingWorkStage
