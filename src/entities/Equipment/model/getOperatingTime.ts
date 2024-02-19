import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TOperatingTime } from './types/types'

type GetOperatingTimeFxResponse = TResponse<TOperatingTime>

export const $operatingTime = createStore<TOperatingTime>({} as TOperatingTime)

export const resetOperatingTime = createEvent<void>()

$operatingTime.reset(resetOperatingTime)

export const getOperatingTimeFx = createEffect<
    number,
    GetOperatingTimeFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.equipment.getOperatingTime(id)))

sample({
    clock: getOperatingTimeFx.doneData,
    fn: ({ data }) => data.data,
    target: $operatingTime,
})
