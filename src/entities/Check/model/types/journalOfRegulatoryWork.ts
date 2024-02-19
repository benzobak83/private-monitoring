import { TIdWithName } from '@shared/types/Global'
import { StateCheckIds } from './types'

export type TJournalOfRegulatoryWorkListItem = {
    id: number
    lastCheck: string
    user: TIdWithName
    object: TIdWithName
    equipment: TIdWithName
    state: { id: StateCheckIds; name: string }
    checklist: TIdWithName
    malfunctionId: number
}
