import { createEffect, createStore, createEvent, sample } from 'effector'
import { TStaffFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TStaff } from './types'

type GetStaffTableDataFxRequest = TTableRequest<Partial<TStaffFilter>> | void
type GetStaffTableDataFxResponse = TResponse<TTableData<TStaff[]>>

export const $staffTableData = createStore<TTableData<TStaff[]>>(
    {} as TTableData<TStaff[]>
)

export const reloadStaffTabledata = createEvent<void>()

export const getStaffTableDataFx = createEffect<
    GetStaffTableDataFxRequest,
    GetStaffTableDataFxResponse,
    TErrorResponse
>((data) => api.post(ENDPOINTS.settings.staff.getList, data))

sample({
    clock: getStaffTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $staffTableData,
})
