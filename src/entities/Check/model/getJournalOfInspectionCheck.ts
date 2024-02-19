import { createEffect, createEvent, createStore, sample } from 'effector'
import { FilterKeys, TFilter } from '@entities/Filter'
import { ChecklistType } from '@entities/Settings/Checklist'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TJournalOfInspectionCheckListItem } from './types/journalOfInspectionCheck'

type TGetDefectResolutionJournalTableDataFxResponse = TResponse<
    TTableData<TJournalOfInspectionCheckListItem[]>
>

export const resetJournalOfInspectionCheckTableData = createEvent<void>()

export const $journalOfInspectionCheckTableData = createStore<TTableData<
    TJournalOfInspectionCheckListItem[]
> | null>(null).reset(resetJournalOfInspectionCheckTableData)

export const getJournalOfInspectionCheckTableDataFx = createEffect<
    TTableRequest<TFilter[FilterKeys.JOURNAL_OF_INSPECTION_CHECK]>,
    TGetDefectResolutionJournalTableDataFxResponse,
    TErrorResponse
>((data) =>
    api.post(ENDPOINTS.check.getCheckJournal, {
        ...data,
        filter: { ...data.filter, typeChecklist: ChecklistType.INSPECTION },
    })
)

sample({
    clock: getJournalOfInspectionCheckTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $journalOfInspectionCheckTableData,
})
