import { createEffect, createEvent, createStore, sample } from 'effector'
import { FilterKeys, TFilter } from '@entities/Filter'
import { ChecklistType } from '@entities/Settings/Checklist'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TJournalOfRegulatoryWorkListItem } from './types/journalOfRegulatoryWork'

type TGetDefectResolutionJournalTableDataFxResponse = TResponse<
    TTableData<TJournalOfRegulatoryWorkListItem[]>
>

export const resetJournalOfRegulatoryWorkTableData = createEvent<void>()

export const $journalOfRegulatoryWorkTableData = createStore<TTableData<
    TJournalOfRegulatoryWorkListItem[]
> | null>(null).reset(resetJournalOfRegulatoryWorkTableData)

export const getJournalOfRegulatoryWorkTableDataFx = createEffect<
    TTableRequest<TFilter[FilterKeys.JOURNAL_OF_REGULATORY_WORK]>,
    TGetDefectResolutionJournalTableDataFxResponse,
    TErrorResponse
>((data) =>
    api.post(ENDPOINTS.check.getCheckJournal, {
        ...data,
        filter: { ...data.filter, typeChecklist: ChecklistType.WORKS },
    })
)

sample({
    clock: getJournalOfRegulatoryWorkTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $journalOfRegulatoryWorkTableData,
})
