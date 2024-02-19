import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TCheck } from './types/types'

type GetHistoryFxResponse = TResponse<TTableData<TCheck[]>>

export const $historyTableData = createStore<TTableData<TCheck[]>>(
    {} as TTableData<TCheck[]>
)

export const resetHistoryTableData = createEvent<void>()

$historyTableData.reset(resetHistoryTableData)

export const getHistoryTableDataFx = createEffect<
    TTableRequest,
    GetHistoryFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.check.getHistory, data))

sample({
    clock: getHistoryTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $historyTableData,
})
