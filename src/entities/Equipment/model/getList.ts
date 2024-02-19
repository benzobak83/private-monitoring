import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TEquipmentListItem } from './types/types'

type GetEquipmentlistTableDataFxRequest = TTableRequest<
    Partial<TFilter['equipment']> | Partial<TFilter['equipmentOfObject']>
>
type GetEquipmentlistTableDataFxResponse = TResponse<
    EquipmentListTableData<TEquipmentListItem[]>
>
type EquipmentListTableData<T> = TTableData<T>

export const $equipmentlistTableData = createStore<
    EquipmentListTableData<TEquipmentListItem[]>
>({} as EquipmentListTableData<TEquipmentListItem[]>)

export const reloadEquipmentlistTabledata = createEvent<void>()

export const getEquipmentlistTableDataFx = createEffect<
    GetEquipmentlistTableDataFxRequest,
    GetEquipmentlistTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.equipment.getList, data))

sample({
    clock: getEquipmentlistTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $equipmentlistTableData,
})
