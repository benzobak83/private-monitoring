import { ChecklistType } from '@entities/Settings/Checklist'

export type TStaffFilter = {
    subdivisionId: number
    typeChecklist: ChecklistType
    userId: number
}
