import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TObjectListItem } from './types'

type GetObjectlistTableDataFxRequest = TTableRequest<Partial<TFilter['object']>>
type GetObjectlistTableDataFxResponse = TResponse<
    ObjectListTableData<TObjectListItem[]>
>
type ObjectListTableData<T> = TTableData<T> & {
    countEquipment: any //TODO:type
}

export const $objectlistTableData = createStore<
    ObjectListTableData<TObjectListItem[]>
>({} as ObjectListTableData<TObjectListItem[]>)

export const reloadObjectlistTabledata = createEvent<void>()

export const getObjectlistTableDataFx = createEffect<
    GetObjectlistTableDataFxRequest,
    GetObjectlistTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.object.getList, data))

sample({
    clock: getObjectlistTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $objectlistTableData,
})
