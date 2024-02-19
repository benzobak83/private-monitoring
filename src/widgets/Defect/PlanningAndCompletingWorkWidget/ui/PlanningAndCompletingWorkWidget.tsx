import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $defect,
    FixMethodTypeIds,
    useCompletingWorkContext,
    usePlanningWorkContext,
} from '@entities/Defect'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { TExecutor, TGetFormsType } from '../model/types'
import { PlanningAndCompletingWorkForm } from './PlanningAndCompletingWorkForm'

type PlanningAndCompletingWorkWidgetProps = {
    executor: TExecutor
    type: TGetFormsType
}

export const PlanningAndCompletingWorkWidget: FC<
    PlanningAndCompletingWorkWidgetProps
> = ({ executor, type }) => {
    const defect = useStore($defect)

    const { planningWork } = usePlanningWorkContext()
    const { completingWork } = useCompletingWorkContext()

    const method =
        defect.method.id === FixMethodTypeIds.HIMSELF
            ? 'Самостоятельное устранение'
            : 'Подразделение'

    const responsible =
        defect.method.id === FixMethodTypeIds.HIMSELF
            ? defect?.check?.user?.name
            : planningWork?.responsible?.name

    return (
        <Stack>
            <MyPaper
                title={method}
                rightContent={`Ответственный: ${responsible}`}
            >
                <PlanningAndCompletingWorkForm
                    executor={executor}
                    stage={completingWork?.state || planningWork?.state}
                    type={type}
                />
            </MyPaper>
        </Stack>
    )
}
