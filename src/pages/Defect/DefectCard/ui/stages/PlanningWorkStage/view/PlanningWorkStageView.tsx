import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $defect,
    $planningWork,
    PlanningWorkProvider,
    getPlanningWorkFx,
} from '@entities/Defect'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { getWorkWidget } from '../../../lib/getWorkWidget'

const PlanningWorkStageView: FC = () => {
    const defect = useStore($defect)
    const planningWork = useStore($planningWork)
    const getPlanningWorkFxIsLoading = useStore(getPlanningWorkFx.pending)

    return (
        <LoaderWrapper loading={getPlanningWorkFxIsLoading}>
            <MyPaper accordion title="Планирование работ" borderRadius={false}>
                <Stack spacing={1.5}>
                    {planningWork.map((item) => {
                        return (
                            <PlanningWorkProvider
                                key={item.id}
                                planningWork={item}
                            >
                                {getWorkWidget(defect?.method?.id, 'planning')}
                            </PlanningWorkProvider>
                        )
                    })}
                </Stack>
            </MyPaper>
        </LoaderWrapper>
    )
}

export default PlanningWorkStageView
