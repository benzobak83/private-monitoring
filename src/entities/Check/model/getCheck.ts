import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TCheck } from './types/types'

type GetCheckFxResponse = TResponse<TCheck>

export const $check = createStore<TCheck>({} as TCheck)

export const reloadCheck = createEvent<number>()
export const resetCheck = createEvent<void>()

$check.reset(resetCheck)

export const getCheckFx = createEffect<
    number,
    GetCheckFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.check.getCheckOfHistory(id)))

sample({
    clock: getCheckFx.doneData,
    fn: ({ data }) => data.data || {},
    target: $check,
})
sample({
    clock: reloadCheck,
    target: getCheckFx,
})
