import { TUser } from '@entities/User'
import { TIdWithName } from '@shared/types/Global'

export type TWorkStartListItem = {
    id: number
    name: string
    works: TWork
}

export type TWork = {
    id: number
    dateStart: string
    dateEnd: string
    duration: string
    isWorkInProgress: boolean
    object: TIdWithName
    user: TUser
}

export type TWorkOfObject = {
    inspectionObject: number
    inspectionEquipment: number
    maintenanceEquipment: number
} & Omit<TWork, 'object'>
