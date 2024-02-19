import { ChecklistType } from '../../Checklist'

export type TChecklistWork = {
    id: number
    name: string
    equipmentCount: number
    typeChecklist: ChecklistType
    roomCount: number
}
export type TChecklistWorkWithItems = TChecklistWork & {
    checklistItems: TChecklistItems[]
}

export type TChecklistItems = {
    id: number
    name: string
    checklistId: number
    answerOptions: TChecklistAnswerOption[]
}

export type TChecklistAnswerOption = {
    id: number
    name: string
    isAnswerResult?: boolean
    checklistItemId: number
}
