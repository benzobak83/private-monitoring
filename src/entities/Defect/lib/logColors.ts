import { DefectStageIds } from '../model/types/types'

export const LOG_COLORS: Record<DefectStageIds, string> = {
    [DefectStageIds.FIX_METHOD]: '#42AAFF',
    [DefectStageIds.PLANNING_WORK]: '#78DBE2',
    [DefectStageIds.COMPLETING_WORK]: '#6A5ACD',
    [DefectStageIds.BUY_NEW]: '#77DDE7',
    [DefectStageIds.WRITE_OFF_MATERIALS]: '#3F888F',
    [DefectStageIds.COMPLETED]: '#3E5F8A',
}
