import { createEffect, createEvent, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TOperatingTimeLogListItem } from './types/types'

type GetTTableDataFxResponse = TResponse<
    TTableData<TOperatingTimeLogListItem[]>
>

export const reloadoperatingTimeLogListTableData = createEvent<void>()
export const resetOperatingTimeLogListTableData = createEvent<void>()

export const $operatingTimeLogListTableData = createStore<
    TTableData<TOperatingTimeLogListItem[]>
>({} as TTableData<TOperatingTimeLogListItem[]>)

export const $operatingTimeLogListTableDataIsReloading = createStore<boolean>(
    false
)
    .on(reloadoperatingTimeLogListTableData, (store) => !store)
    .reset(resetOperatingTimeLogListTableData)

export const getOperatingTimeLogListTableDataFx = createEffect<
    WithId<TTableRequest>,
    GetTTableDataFxResponse,
    TErrorResponse
>(({ data, id }) =>
    api.post(ENDPOINTS.equipment.getOperatingTimeLogList(id), data)
)

sample({
    clock: getOperatingTimeLogListTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $operatingTimeLogListTableData,
})
