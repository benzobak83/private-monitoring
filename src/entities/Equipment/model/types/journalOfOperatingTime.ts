import { TIdWithName } from '@shared/types/Global'

export type TJournalOfOperatingTimeListItem = {
    id: number
    value: number
    sum: number
    user: TIdWithName
    createdAt: string
    equipment: TIdWithName
    object: TIdWithName
    subdivision: TIdWithName
}
