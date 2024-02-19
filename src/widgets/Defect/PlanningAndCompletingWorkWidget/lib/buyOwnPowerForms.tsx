import { DefectWorkStageIds } from '@entities/Defect'
import { AgreementForm } from '../ui/Agreement/AgreementForm'
import { AgreementView } from '../ui/Agreement/AgreementView'
import { CompletingWorkByMasterForm } from '../ui/buyOwnPowerComponents/CompletingWorkByMaster/CompletingWorkByMasterForm'
import { CompletingWorkByMasterView } from '../ui/buyOwnPowerComponents/CompletingWorkByMaster/CompletingWorkByMasterView'
import { PickMasterForm } from '../ui/buyOwnPowerComponents/PickMaster/PickMasterForm'
import { PickMasterView } from '../ui/buyOwnPowerComponents/PickMaster/PickMasterView'
import { WorkDecisionByResponsiblePersonForm } from '../ui/buyOwnPowerComponents/WorkDecisionByResponsiblePerson/WorkDecisionByResponsiblePersonForm'
import { WorkDecisionByResponsiblePersonView } from '../ui/buyOwnPowerComponents/WorkDecisionByResponsiblePerson/WorkDecisionByResponsiblePersonView'
import { StartExecutionForm } from '../ui/StartExecution/StartExecutionForm'
import { StartExecutionView } from '../ui/StartExecution/StartExecutionView'
import { WriteOffMattertialsForm } from '../ui/WriteOffMattertials/WriteOffMattertialsForm'

export const getFormBuyOwnPower = () => {
    return {
        planning: [
            {
                create: <PickMasterForm />,
                view: <PickMasterView />,
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
                create: <CompletingWorkByMasterForm />,
                view: <CompletingWorkByMasterView />,
                divider: false,
                title: null,
                stage: DefectWorkStageIds.DEFINITION,
            },
            {
                create: <WorkDecisionByResponsiblePersonForm />,
                view: <WorkDecisionByResponsiblePersonView />,
                divider: true,
                triggerDividerOnlyByState: true,
                title: 'Согласование с ответственным лицом',
                stage: DefectWorkStageIds.AGREEMENT,
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
