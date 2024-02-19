import { ChecklistType } from '../../Checklist/'

export type TChecklistInspection = {
    id: number
    name: string
    typeChecklist: ChecklistType
    equipmentCount: number
    roomCount: number
}
export enum ChecklistTypeAnswer {
    'OK' = 10,
    'WARNING' = 20,
    'NEGATIVE' = 30,
}
export type TChecklistInspectionWithItems = TChecklistInspection & {
    checklistItems: TChecklistItems[]
}

export type TChecklistForSelect = TChecklistInspection

export type TChecklistItems = {
    id: number
    name: string
    sort: number
    checklistId: number
    answerOptions: TChecklistAnswerOption[]
}

export type TChecklistAnswerOption = {
    id: number
    name: string
    typeAnswer: ChecklistTypeAnswer
    isAnswerResult?: boolean
    checklistItemId: number
}
