import { ResultCheckIds } from '@entities/Check'

export type TEquipmentFilter = {
    userId: number
    directionId: number
    activityId: number
    territoryId: number
    subdivisionId: number
    typeEquipmentId: number
    objectId: number
    result: ResultCheckIds
}
