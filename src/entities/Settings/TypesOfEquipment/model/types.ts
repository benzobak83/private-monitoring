import { TIdWithName } from '@shared/types/Global'
import { ChecklistTypeControl } from '../../Checklist'

export type TTypeOfEquipment = {
    id: number
    name: string
    checklistInspection: TChecklistInspection[]
    checklistMaintenance: TChecklistMaintenance[]
}

export type TChecklistOfTypeOfEquipment = { description: string } & TIdWithName

type TChecklistInspection = {
    typeControl: number
    date: string
    isRegular: boolean
    repeated: number
    frequency: number
    mileage: number
    checklist: TChecklistOfTypeOfEquipment
}

export type TChecklistMaintenance = {
    id: number
    checklist: TChecklistOfTypeOfEquipment
    typeControl: ChecklistTypeControl
}

export type TTypeOfEquipmentRow = {
    id: number
    name: string
    checklistInspection: string
    checklistMaintenance: string
}
