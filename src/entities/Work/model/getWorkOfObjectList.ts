import { createEffect, createEvent, createStore, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TWorkOfObject } from './types'

type GetWorkListOfObjectTableDataFxRequest = WithId<
    TTableRequest<Partial<TFilter['workOfObject']>>
>
type GetWorkListOfObjectTableDataFxResponse = TResponse<
    TTableData<TWorkOfObject[]>
>

export const reloadWorkListOfObjectTableData = createEvent<void>()

export const $workListOfObjectTableDataIsReloaded = createStore<boolean>(false)

export const $workListOfObjectTableData = createStore<
    TTableData<TWorkOfObject[]>
>({} as TTableData<TWorkOfObject[]>)

export const getWorkListOfObjectTableDataFx = createEffect<
    GetWorkListOfObjectTableDataFxRequest,
    GetWorkListOfObjectTableDataFxResponse,
    TErrorResponse
>(({ data, id }) => api.post(ENDPOINTS.work.getWorkOfObjectList(id), data))

sample({
    clock: getWorkListOfObjectTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $workListOfObjectTableData,
})

sample({
    source: $workListOfObjectTableDataIsReloaded,
    clock: reloadWorkListOfObjectTableData,
    fn: (store) => !store,
    target: $workListOfObjectTableDataIsReloaded,
})
