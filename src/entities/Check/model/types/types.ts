import { DefectTypeIds } from '@entities/Defect'
import { ChecklistType } from '@entities/Settings/Checklist'
import { TChecklistInspectionWithItems } from '@entities/Settings/ChecklistInspection'
import { TUser } from '@entities/User'
import { TIdWithName } from '@shared/types/Global'

export enum ResultCheckIds {
    'OK' = 10,
    'WARNING' = 20,
    'NEGATIVE' = 30,
}

export enum StateCheckIds {
    'NOT_COMPLETED' = 10,
    'NEW' = 20,
    'COMPLETED' = 30,
}

export type TStatisticsResult = {
    success?: number
    warning: number
    negative: number
    all?: number
}

export type TCheck = {
    checklistId: number
    id: number
    state: { id: StateCheckIds; name: string }
    createdAt: string
    result: { id: ResultCheckIds; name: string }
    user: TUser
    description: string //регулярность
    comment: string
    lastCheck: string
}

export type TCheckOfHistory = TCheck & {
    checklist: TChecklistInspectionWithItems
}

export type TCheckOfDefect = Omit<TCheckOfHistory, 'result'> & {
    result: { id: DefectTypeIds; name: string }
}

export type THistoryOfInspectionCheckForEquipmentListItem = {
    id: number
    state: { id: StateCheckIds; name: string }
    result: { id: ResultCheckIds; name: string }
    dateChecked: string
    user: TIdWithName
    checklist: TIdWithName & {
        typeChecklist: ChecklistType
    }
}

export type THistoryOfRegulatoryWorkCheckForEquipmentListItem = Omit<
    THistoryOfInspectionCheckForEquipmentListItem,
    'result'
>

export type THistoryOfCheckForEquipmentListItem =
    | THistoryOfInspectionCheckForEquipmentListItem
    | THistoryOfRegulatoryWorkCheckForEquipmentListItem
