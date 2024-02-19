import { DefectStageIds } from '../model/types/types'

export const DEFECT_STAGE_OPTIONS = [
    { id: DefectStageIds.FIX_METHOD, label: 'Определение метода устранения' },
    { id: DefectStageIds.PLANNING_WORK, label: 'Планирование работ' },
    { id: DefectStageIds.COMPLETING_WORK, label: 'Выполнение работ' },
    { id: DefectStageIds.BUY_NEW, label: 'Приобретение нового' },
    { id: DefectStageIds.WRITE_OFF_MATERIALS, label: 'Списание материалов' },
    { id: DefectStageIds.COMPLETED, label: 'Завершено' },
]
