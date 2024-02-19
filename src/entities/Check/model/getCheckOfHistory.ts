import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TCheckOfHistory } from './types/types'

type GetCheckOfHistoryFxResponse = TResponse<TCheckOfHistory>

export const $checkOfHistory = createStore<TCheckOfHistory>(
    {} as TCheckOfHistory
)

export const resetCheckOfHistory = createEvent<void>()

$checkOfHistory.reset(resetCheckOfHistory)

export const getCheckOfHistoryFx = createEffect<
    number,
    GetCheckOfHistoryFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.check.getCheckOfHistory(id)))

sample({
    clock: getCheckOfHistoryFx.doneData,
    fn: ({ data }) => data.data || {},
    target: $checkOfHistory,
})
