import { StateCheckIds, TCheck } from '@entities/Check'
import { ChecklistType } from '@entities/Settings/Checklist'
import { TIdWithName } from '@shared/types/Global'

export type TTaskListItem = {
    id: number
    typeChecklist: { id: ChecklistType; name: string }
    state: { id: StateCheckIds; name: string }
    object: TIdWithName
    equipment: string
    dateChecked: string
    checklist: TIdWithName
    name: string
    user: TIdWithName
    regularity: string
}

export type TUnfinishedTask = {
    id: number
    checks: TCheck[]
}
