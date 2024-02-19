import { DefectWorkStageIds } from '@entities/Defect'

export type AgreementFormType = 'agreeAgreement' | 'refuseAgreement'
export type WorkDecisionFormType = 'agreeWorkDecision' | 'refuseWorkDecision'

export type DefectWorkStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type TExecutor = 'himself' | 'contract' | 'ownPower'

export type TForm = {
    create: JSX.Element | null
    view: JSX.Element | null
    divider: boolean
    title: string | null
    triggerDividerOnlyByState?: boolean
    stage: DefectWorkStageIds | null
    readonly?: boolean
}

export type TGetFormsType = 'planning' | 'completing' | 'writeOffMaterials'
