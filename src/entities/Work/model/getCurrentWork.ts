import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TWork } from './types'

type GetCurrentWorkFxResponse = TResponse<TWork>

export const $currentWork = createStore<TWork>({} as TWork)

export const reloadCurrentWork = createEvent<void>()
export const resetCurrentWork = createEvent<void>()

$currentWork.reset(resetCurrentWork)

export const getCurrentWorkFx = createEffect<
    void,
    GetCurrentWorkFxResponse,
    TErrorResponse
>(() => api.get(ENDPOINTS.work.getCurrentWork))

sample({
    clock: getCurrentWorkFx.doneData,
    fn: ({ data }) => data.data,
    target: $currentWork,
})
sample({
    clock: reloadCurrentWork,
    target: getCurrentWorkFx,
})
