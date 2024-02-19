import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TRegulatoryWorkListItem } from './types'

type GetRegulatoryWorkListTableDataFxRequest = TTableRequest<
    Partial<TFilter['regulatoryWork']>
>
type GetRegulatoryWorkListTableDataFxResponse = TResponse<
    ObjectListTableData<TRegulatoryWorkListItem[]>
>
type ObjectListTableData<T> = TTableData<T>

export const $regulatoryWorkListTableData = createStore<
    ObjectListTableData<TRegulatoryWorkListItem[]>
>({} as ObjectListTableData<TRegulatoryWorkListItem[]>)

export const reloadRegulatoryWorkListTableData = createEvent<void>()
export const resetRegulatoryWorkListTableData = createEvent<void>()

$regulatoryWorkListTableData.reset(resetRegulatoryWorkListTableData)

export const getRegulatoryWorkListTableDataFx = createEffect<
    GetRegulatoryWorkListTableDataFxRequest,
    GetRegulatoryWorkListTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.regulatoryWork.getList, data))

sample({
    clock: getRegulatoryWorkListTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $regulatoryWorkListTableData,
})
