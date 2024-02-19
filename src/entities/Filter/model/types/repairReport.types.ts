import { DefectStageIds, FixMethodTypeIds } from '@entities/Defect'
import { TRange } from '@shared/types/Global'

export type TRepairReportFilter = {
    period: TRange
    result: number
    stage: DefectStageIds
    priority: number
    method: FixMethodTypeIds
    subdivisionId: number
    objectId: number
    equipment: string
    userId: number
}
