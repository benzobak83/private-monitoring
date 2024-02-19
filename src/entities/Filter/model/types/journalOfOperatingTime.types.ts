import { TRange } from '@shared/types/Global'

export type TJournalOfOperatingTimeFilter = {
    userId: number
    period: TRange
    equipmentId: number
}
