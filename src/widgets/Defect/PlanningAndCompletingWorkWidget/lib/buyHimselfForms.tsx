import { DefectWorkStageIds } from '@entities/Defect'
import { CompletingWorkForm } from '../ui/buyHimselfComponents/CompletingWork/CompletingWorkForm'
import { CompletingWorkView } from '../ui/buyHimselfComponents/CompletingWork/CompletingWorkView'
import { PlanningForm } from '../ui/buyHimselfComponents/PlanningWork/PlanningWorkForm'
import { PlanningWorkView } from '../ui/buyHimselfComponents/PlanningWork/PlanningWorkView'
import { StartExecutionForm } from '../ui/StartExecution/StartExecutionForm'
import { StartExecutionView } from '../ui/StartExecution/StartExecutionView'
import { WriteOffMattertialsForm } from '../ui/WriteOffMattertials/WriteOffMattertialsForm'

export const getFormByHimself = () => {
    return {
        planning: [
            {
                create: <PlanningForm />,
                view: <PlanningWorkView />,
                divider: false,
                title: 'Планирование работ',
                stage: DefectWorkStageIds.DEFINITION,
            },

            {
                create: <StartExecutionForm />,
                view: <StartExecutionView />,
                divider: true,
                title: 'Выполнение работ',
                stage: DefectWorkStageIds.COMPLETING,
            },
        ],
        completing: [
            {
                create: <CompletingWorkForm />,
                view: <CompletingWorkView />,
                divider: false,
                title: null,
                stage: DefectWorkStageIds.DEFINITION,
            },
        ],
        writeOffMaterials: [
            {
                create: <WriteOffMattertialsForm />,
                view: null,
                divider: true,
                title: 'Списание материалов',
                stage: DefectWorkStageIds.COMPLETING,
            },
        ],
    }
}
