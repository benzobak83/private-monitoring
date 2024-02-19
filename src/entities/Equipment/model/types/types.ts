import { ResultCheckIds } from '@entities/Check'
import { TUser } from '@entities/User'
import { TIdWithName } from '@shared/types/Global'

export type TEquipmentListItem = {
    id: number
    name: string
    inventoryNumber: string
    user: TUser
    object: TIdWithName
    result: ResultCheckIds
    technicalNumber: string
    fixedAsset: TIdWithName
}

export type TEquipmentItem = {
    id: number
    name: string
    user: TIdWithName
    typeEquipment: TIdWithName
    subdivision: TIdWithName
    object: TIdWithName
    inventoryNumber: string
    technicalNumber: string
    fixedAsset: {
        address: string
        id: number
        inventoryNumber: string
        name: string
        workshop: string
    }
}

export type TOperatingTime = {
    sum: string
    graph: TOperatingTimeGraphItem[]
}

export type TOperatingTimeGraphItem = { value: string }

export type TOperatingTimeLogListItem = {
    id: number
    value: number
    sum: number
    user: TIdWithName
    createdAt: string
}

export type TBuyNewStage = {
    id: number
    equipmentOld: string
    equipmentNew: TIdWithName
    user: TIdWithName
}

export type TEquipmentStatistics = {
    success: number
    negative: number
    warning: number
}
