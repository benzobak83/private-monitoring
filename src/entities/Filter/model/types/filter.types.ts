import { TDefectFilter } from './defectFilter.types'
import { TEquipmentFilter } from './equipmentFilter.types'
import { TEquipmentOfObjectFilter } from './equipmentOfObjectFilter.types'
import { TJournalOfInspectionCheckFilter } from './journalOfInspectionCheck.types'
import { TJournalOfOperatingTimeFilter } from './journalOfOperatingTime.types'
import { TJournalOfRegulatoryWorkFilter } from './journalOfRegulatoryWork.types'
import { TMaterialsListFilter } from './materialsListFilter.types'
import { TMotoHourseReportFilter } from './motohourseFilter.types'
import { TObjectFilter } from './objectFilter.types'
import { TRegulatoryWorkFilter } from './regulatoryWorkFilter.types'
import { TRepairReportFilter } from './repairReport.types'
import { TStaffFilter } from './staffFilter.types'
import { TStartWorkFilter } from './startWorkFilter.types'
import { TWorkFilter } from './workFilter.types'
import { TWorkOfObjectFilter } from './workOfObjectFilter.types'

export enum FilterKeys {
    'STAFF' = 'staff',
    'OBJECT' = 'object',
    'EQUIPMENT_OF_OBJECT' = 'equipmentOfObject',
    'WORK_OF_OBJECT' = 'workOfObject',
    'DEFECT' = 'defect',
    'EQUIPMENT' = 'equipment',
    'WORK' = 'work',
    'START_WORK' = 'startWork',
    'REGULATORY_WORK' = 'regulatoryWork',
    'REPAIR_REPORT' = 'repairReport',
    'MOTOHOURSE_REPORT' = 'motohourseReport',
    'MATERIAL' = 'material',
    'JOURNAL_OF_INSPECTION_CHECK' = 'journalOfInspectionCheck',
    'JOURNAL_OF_REGULATORY_WORK' = 'journalOfRegulatoryWork',
    'JOURNAL_OF_OPERATING_TIME' = 'journalOfOperatingTime',
}

export type TFilter = {
    [FilterKeys.STAFF]: TStaffFilter
    [FilterKeys.OBJECT]: TObjectFilter
    [FilterKeys.EQUIPMENT_OF_OBJECT]: TEquipmentOfObjectFilter
    [FilterKeys.WORK_OF_OBJECT]: TWorkOfObjectFilter
    [FilterKeys.DEFECT]: TDefectFilter
    [FilterKeys.EQUIPMENT]: TEquipmentFilter
    [FilterKeys.WORK]: TWorkFilter
    [FilterKeys.START_WORK]: TStartWorkFilter
    [FilterKeys.REGULATORY_WORK]: TRegulatoryWorkFilter
    [FilterKeys.REPAIR_REPORT]: TRepairReportFilter
    [FilterKeys.MOTOHOURSE_REPORT]: TMotoHourseReportFilter
    [FilterKeys.MATERIAL]: TMaterialsListFilter
    [FilterKeys.JOURNAL_OF_INSPECTION_CHECK]: TJournalOfInspectionCheckFilter
    [FilterKeys.JOURNAL_OF_REGULATORY_WORK]: TJournalOfRegulatoryWorkFilter
    [FilterKeys.JOURNAL_OF_OPERATING_TIME]: TJournalOfOperatingTimeFilter
}

export type TSetFilter = { type: FilterKeys; value: Record<string, any> }
