import { DefectTypeIds } from '../model/types/types'

export const DEFECTS_OPTIONS = [
    { id: DefectTypeIds.WARNING, name: 'Инцидент' },
    { id: DefectTypeIds.NEGATIVE, name: 'Авария' },
]

export const getDefectOptionName = (defectId: DefectTypeIds) => {
    return DEFECTS_OPTIONS.find((defect) => defect.id === defectId)?.name
}
