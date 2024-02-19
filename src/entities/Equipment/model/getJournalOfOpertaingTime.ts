import { createEffect, createEvent, createStore, sample } from 'effector'
import { FilterKeys, TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TJournalOfOperatingTimeListItem } from './types/journalOfOperatingTime'

type TGetDefectResolutionJournalTableDataFxResponse = TResponse<
    TTableData<TJournalOfOperatingTimeListItem[]>
>

export const resetJournalOfOperatingTimeTableData = createEvent<void>()

export const $journalOfOperatingTimeTableData = createStore<TTableData<
    TJournalOfOperatingTimeListItem[]
> | null>(null).reset(resetJournalOfOperatingTimeTableData)

export const getJournalOfOperatingTimeTableDataFx = createEffect<
    TTableRequest<TFilter[FilterKeys.JOURNAL_OF_OPERATING_TIME]>,
    TGetDefectResolutionJournalTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.equipment.getOperatingTimeJournal, data))

sample({
    clock: getJournalOfOperatingTimeTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $journalOfOperatingTimeTableData,
})
