import { TIdWithName } from '@shared/types/Global'
import { ResultCheckIds, StateCheckIds } from './types'

export type TJournalOfInspectionCheckListItem = {
    id: number
    lastCheck: string
    user: TIdWithName
    object: TIdWithName
    equipment: TIdWithName
    state: { id: StateCheckIds; name: string }
    result: { id: ResultCheckIds; name: string }
    checklist: TIdWithName
    malfunctionId: number
}
