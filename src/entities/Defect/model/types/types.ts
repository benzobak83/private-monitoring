import { TCheckOfDefect } from '@entities/Check'
import { DefectPriority, TypeManager } from '@entities/Dict'
import { TIdWithName } from '@shared/types/Global'
import { FixMethodTypeIds } from './fixMethod'

export enum DefectTypeIds {
    'WARNING' = 20,
    'NEGATIVE' = 30,
}

export enum DefectStageIds {
    'FIX_METHOD' = 10,
    'PLANNING_WORK' = 20,
    'COMPLETING_WORK' = 30,
    'BUY_NEW' = 40,
    'WRITE_OFF_MATERIALS' = 50,
    'COMPLETED' = 60,
}

export enum ResponisblePersonTypeIds {
    'MAIN_MECHANIC' = 10,
    'MAIN_ENERGETIC' = 20,
    'MAIN_YKRS' = 30,
}

export enum AgreementAnswerIds {
    'MY_SERVICE' = 10,
    'SUBDIVISION' = 20,
    'TRANSFER_TO_ENGINEER' = 30,
}
export type TDefect = {
    id: number
    priority: number
    client: TIdWithName
    object: TIdWithName
    equipment: TIdWithName
    stage: { id: DefectStageIds; name: string }
    check: TCheckOfDefect
    method: { id: FixMethodTypeIds; name: string }
    subdivision: TIdWithName & { user: TIdWithName }
}

export type TDefectItemOfList = {
    id: number
    priority: TIdWithName
    object: TIdWithName
    method: { id: FixMethodTypeIds; name: string }
    equipment: TIdWithName
    stage: { id: DefectStageIds; name: string }
    result: { id: DefectTypeIds; name: string }
    client: TIdWithName
    subdivision: TIdWithName
    sum: string[]
    comment: string
    executionDate: {
        dateStart: string
        dateEnd: string
    }[]
    planDate: {
        dateStart: string
        dateEnd: string
    }[]
}

export type TDefectOfEqupmentListItem = {
    id: number
    priority: { id: DefectPriority; name: string }
    stage: { id: DefectStageIds; name: string }
    method: { id: FixMethodTypeIds; name: string }
    createdAt: string
    dateEnd: string
}

export type TAgreement = {
    answer: { id: AgreementAnswerIds; name: string }
    comment: string | null
    createdAt: string
    diagnosticId: number
    id: number
    key: TypeManager
    sum: string
    user: TIdWithName
}

export type TWorkAgreement = {
    comment: string
    id: number
    planningId: number
    status: boolean
    date: string
    sum: string
    user: TIdWithName
    isViewApproval: false
}

export enum DefectWorkStageIds {
    'DEFINITION' = 10,
    'AGREEMENT' = 20,
    'COMPLETING' = 30,
}
