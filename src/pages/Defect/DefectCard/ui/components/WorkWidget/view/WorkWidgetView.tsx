import { Stack } from '@mui/material'
import { FC } from 'react'
import CompletingWorkStageView from '../../../stages/CompletingWorkStage/view/CompletingWorkStageView'
import PlanningWorkStageView from '../../../stages/PlanningWorkStage/view/PlanningWorkStageView'

const WorkWidgetView: FC = () => {
    return (
        <Stack spacing={1.5}>
            <PlanningWorkStageView />
            <CompletingWorkStageView />
        </Stack>
    )
}

export default WorkWidgetView
