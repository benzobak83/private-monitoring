import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TWork } from './types'

type GetWorklistTableDataFxRequest = TTableRequest<Partial<TFilter['work']>>
type GetWorklistTableDataFxResponse = TResponse<WorkListTableData<TWork[]>>
type WorkListTableData<T> = TTableData<T>

export const $worklistTableData = createStore<WorkListTableData<TWork[]>>(
    {} as WorkListTableData<TWork[]>
)

export const $workListTableDataIsReloaded = createStore<boolean>(false)

export const reloadWorklistTabledata = createEvent<void>()

export const getWorklistTableDataFx = createEffect<
    GetWorklistTableDataFxRequest,
    GetWorklistTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.work.getList, data))

sample({
    clock: getWorklistTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $worklistTableData,
})

sample({
    source: $workListTableDataIsReloaded,
    clock: reloadWorklistTabledata,
    fn: (store) => !store,
    target: $workListTableDataIsReloaded,
})
