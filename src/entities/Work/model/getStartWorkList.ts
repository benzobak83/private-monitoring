import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TWork } from './types'

export type GetStartWorkListTableDataFxRequest = TTableRequest<
    Partial<TFilter['startWork']>
>
type GetStartWorkListTableDataFxResponse = TResponse<WorkListTableData<TWork[]>>
type WorkListTableData<T> = TTableData<T>

export const $startWorkListTableData = createStore<WorkListTableData<TWork[]>>(
    {} as WorkListTableData<TWork[]>
)

export const $startWorkListTableDataIsReloaded = createStore<boolean>(false)

export const reloadStartWorkListTabledata = createEvent<void>()

export const getStartWorkListTableDataFx = createEffect<
    GetStartWorkListTableDataFxRequest,
    GetStartWorkListTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.work.getStartWorkList, data))

sample({
    clock: getStartWorkListTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $startWorkListTableData,
})

sample({
    source: $startWorkListTableDataIsReloaded,
    clock: reloadStartWorkListTabledata,
    fn: (store) => !store,
    target: $startWorkListTableDataIsReloaded,
})
