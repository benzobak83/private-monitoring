import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $completingWork,
    $defect,
    CompletingWorkProvider,
    PlanningWorkProvider,
    TPlanningWork,
    getCompletingWorkFx,
    getPlanningWorkById,
    getPlanningWorkFx,
} from '@entities/Defect'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { getWorkWidget } from '../../../lib/getWorkWidget'

const CompletingWorkStageView: FC = () => {
    const defect = useStore($defect)
    const getCompletingWorkFxIsLoading = useStore(getCompletingWorkFx.pending)
    const getPlanningWorkFxIsLoading = useStore(getPlanningWorkFx.pending)
    const completingWork = useStore($completingWork)

    return (
        <LoaderWrapper
            loading={getCompletingWorkFxIsLoading || getPlanningWorkFxIsLoading}
        >
            <MyPaper accordion title="Выполнение работ" borderRadius={false}>
                <Stack spacing={1.5}>
                    {completingWork.map((item) => {
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
                                        'completing'
                                    )}
                                </CompletingWorkProvider>
                            </PlanningWorkProvider>
                        )
                    })}
                </Stack>
            </MyPaper>
        </LoaderWrapper>
    )
}

export default CompletingWorkStageView
