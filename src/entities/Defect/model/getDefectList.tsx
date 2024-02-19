import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TDefectItemOfList } from './types/types'

type GetDefectListTableDataFxRequest = TTableRequest<Partial<TFilter['defect']>>
type GetDefectListTableDataFxResponse = TResponse<
    TTableData<TDefectItemOfList[]>
>

export const reloadDefectListTabledata = createEvent<void>()
export const resetDefectListTabledata = createEvent<void>()

export const $defectListTableData = createStore<
    TTableData<TDefectItemOfList[]>
>({} as TTableData<TDefectItemOfList[]>).reset(resetDefectListTabledata)

export const getDefectListTableDataFx = createEffect<
    GetDefectListTableDataFxRequest,
    GetDefectListTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.defect.getList, data))

sample({
    clock: getDefectListTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $defectListTableData,
})
