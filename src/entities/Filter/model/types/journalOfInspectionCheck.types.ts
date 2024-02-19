import { ResultCheckIds } from '@entities/Check'
import { FixMethodStageIds } from '@entities/Defect'
import { ChecklistType } from '@entities/Settings/Checklist'
import { TRange } from '@shared/types/Global'

export type TJournalOfInspectionCheckFilter = {
    objectId: number
    state: FixMethodStageIds
    userId: number
    typeChecklist: ChecklistType
    period: TRange
    equipmentId: number
    resultId: ResultCheckIds
}
