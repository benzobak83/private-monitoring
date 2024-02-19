import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { $defect } from './getDefect'
import { TFixMethod } from './types/fixMethod'

type GetFixMethodFxResponse = TResponse<TFixMethod[]>

export const reloadFixMethod = createEvent<void>()
export const resetFixMethod = createEvent<void>()

export const $fixMethod = createStore<TFixMethod[]>([] as TFixMethod[]).reset(
    resetFixMethod
)
export const $fixMethodLast = $fixMethod.map(
    (fixMethod) => fixMethod?.[fixMethod?.length - 1] || {}
)

export const getFixMethodFx = createEffect<
    number,
    GetFixMethodFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getFixMethod(id)))

sample({
    clock: getFixMethodFx.doneData,
    fn: ({ data }) => data.data,
    target: $fixMethod,
})
sample({
    source: $defect,
    clock: reloadFixMethod,
    fn: ({ id }) => id,
    target: getFixMethodFx,
})
