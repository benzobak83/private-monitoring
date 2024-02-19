import { ResultCheckIds, TCheck, TStatisticsResult } from '@entities/Check'
import { TFile } from '@entities/File'
import { TWork } from '@entities/Work'
import { TIdWithName } from '@shared/types/Global'

export type TObjectListItem = {
    id: number
    name: string
    address: string
    subdivision: TIdWithName
    objectCheck: ResultCheckIds
    equipmentCheck: TStatisticsResult
}

export type TObjectItem = {
    id: number
    name: string
    address: string
    subdivision: TIdWithName
    check: TCheck | null
    direction: TIdWithName
    territory: TIdWithName
    activity: TIdWithName
    checklist: TIdWithName
    work: TWork
    checkCount: number
    malfunctionCount: number
    equipmentCount: number
    user: TIdWithName
}

export type TSchemaOfObject = {
    id: number
    name: 'image' | 'file'
    objectId: number
    files: TFile[]
}
