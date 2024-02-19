import { DefectStageIds, DefectWorkStageIds } from '@entities/Defect'
import { TExecutor, TForm, TGetFormsType } from '../model/types'
import { getFormByHimself } from './buyHimselfForms'
import { getFormBuyOwnPower } from './buyOwnPowerForms'
import { getFormByContract } from './byContractForms'

const getForm = (executor: TExecutor): Record<TGetFormsType, TForm[]> => {
    switch (executor) {
        case 'ownPower':
            return getFormBuyOwnPower()
        case 'contract':
            return getFormByContract()
        case 'himself':
            return getFormByHimself()
    }
}

export const getForms = (
    currentStage: DefectWorkStageIds,
    executor: TExecutor,
    type: TGetFormsType,
    defectStage: DefectStageIds
) => {
    const forms = getForm(executor)

    const formTypes: TGetFormsType[] = [
        'planning',
        'completing',
        'writeOffMaterials',
    ]

    const components: TForm[] = []

    for (let i = 0; i < formTypes.length; i++) {
        if (formTypes[i] === type) {
            components.push(...forms[formTypes[i]])
            break
        } else {
            components.push(
                ...forms[formTypes[i]].map((form) => ({
                    ...form,
                    readonly: true,
                }))
            )
        }
    }

    return components.map((component) => {
        const stage = Number(component.stage)

        const needDividerAndTitle = component.triggerDividerOnlyByState
            ? Number(currentStage) >= stage
            : Number(currentStage) > stage || type === 'completing'

        const stageIsCompleted = defectStage === DefectStageIds.COMPLETED

        return {
            component:
                currentStage == stage && !component?.readonly
                    ? component.create
                    : Number(currentStage) > stage || !!component?.readonly
                    ? component.view
                    : null,
            stage: stage,
            title:
                (needDividerAndTitle || stageIsCompleted) && component?.title,
            divider:
                (needDividerAndTitle || stageIsCompleted) && component?.divider,
        }
    })
}
