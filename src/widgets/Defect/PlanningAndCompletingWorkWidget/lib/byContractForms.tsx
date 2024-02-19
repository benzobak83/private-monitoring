import { DefectWorkStageIds } from '@entities/Defect'
import { AgreementForm } from '../ui/Agreement/AgreementForm'
import { AgreementView } from '../ui/Agreement/AgreementView'
import { CompletingWorkForm } from '../ui/buyContractComponents/CompletingWork/CompletingWorkForm'
import { CompletingWorkView } from '../ui/buyContractComponents/CompletingWork/CompletingWorkView'
import { PlanningWorkForm } from '../ui/buyContractComponents/PlanningWork/PlanningWorkForm'
import { PlanningWorkView } from '../ui/buyContractComponents/PlanningWork/PlanningWorkView'
import { StartExecutionForm } from '../ui/StartExecution/StartExecutionForm'
import { StartExecutionView } from '../ui/StartExecution/StartExecutionView'
import { WriteOffMattertialsForm } from '../ui/WriteOffMattertials/WriteOffMattertialsForm'

export const getFormByContract = () => {
    return {
        planning: [
            {
                create: <PlanningWorkForm />,
                view: <PlanningWorkView />,
                divider: false,
                title: 'Планирование работ',
                stage: DefectWorkStageIds.DEFINITION,
            },

            {
                create: <AgreementForm />,
                view: <AgreementView />,
                divider: true,
                title: 'Согласование стоимости работ с ОПП',
                stage: DefectWorkStageIds.AGREEMENT,
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
