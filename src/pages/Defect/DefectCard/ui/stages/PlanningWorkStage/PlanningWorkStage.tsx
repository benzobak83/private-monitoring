import { Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import {
    $completingWork,
    $defect,
    $planningWork,
    PlanningWorkProvider,
} from '@entities/Defect'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { getWorkWidget } from '../../lib/getWorkWidget'

const PlanningWorkStage: FC = () => {
    const defect = useStore($defect)
    const planningWork = useStore($planningWork)
    const completingWork = useStore($completingWork)

    const filteredPlanningWorks = useMemo(() => {
        return planningWork.filter(
            (planningWork) =>
                !completingWork
                    .map((completingWork) => completingWork.planningId)
                    .includes(planningWork.id)
        )
    }, [planningWork, completingWork])

    if (!filteredPlanningWorks.length) {
        return null
    }
    return (
        <Stack spacing={1.5}>
            <TitlePage>Планирование работ</TitlePage>
            <Divider />
            {filteredPlanningWorks.map((item) => {
                return (
                    <PlanningWorkProvider key={item.id} planningWork={item}>
                        {getWorkWidget(defect?.method?.id, 'planning')}
                    </PlanningWorkProvider>
                )
            })}
        </Stack>
    )
}

export default PlanningWorkStage
