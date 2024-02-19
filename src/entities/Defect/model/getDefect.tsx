import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TDefect } from './types/types'

type GetDefectFxResponse = TResponse<TDefect>

export const reloadDefect = createEvent<void>()
export const resetDefect = createEvent<void>()

export const $defect = createStore<TDefect>({} as TDefect).reset(resetDefect)

export const getDefectFx = createEffect<
    number,
    GetDefectFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getItem(id)))

sample({
    clock: getDefectFx.doneData,
    fn: ({ data }) => data.data,
    target: $defect,
})
sample({
    source: $defect,
    clock: reloadDefect,
    fn: ({ id }) => id,
    target: getDefectFx,
})
