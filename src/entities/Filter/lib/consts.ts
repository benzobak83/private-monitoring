import { TFilter } from '../model/types/filter.types'

export const DEFAULT_FILTER_VALUES: TFilter = {
    staff: {} as TFilter['staff'],
    object: {} as TFilter['object'],
    equipmentOfObject: {} as TFilter['equipmentOfObject'],
    workOfObject: {} as TFilter['workOfObject'],
    defect: {} as TFilter['defect'],
    equipment: {} as TFilter['equipment'],
    work: {} as TFilter['work'],
    startWork: {} as TFilter['startWork'],
    regulatoryWork: {} as TFilter['regulatoryWork'],
    motohourseReport: {} as TFilter['motohourseReport'],
    repairReport: {} as TFilter['repairReport'],
    material: {} as TFilter['material'],
    journalOfInspectionCheck: {} as TFilter['journalOfInspectionCheck'],
    journalOfRegulatoryWork: {} as TFilter['journalOfRegulatoryWork'],
    journalOfOperatingTime: {} as TFilter['journalOfOperatingTime'],
}
