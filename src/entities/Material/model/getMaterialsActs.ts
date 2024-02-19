import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TMaterialsAct } from './types'

type GetMaterialsActsResponse = TResponse<TMaterialsAct[]>

export const $materialsActs = createStore([] as TMaterialsAct[])

export const getMaterialsActs = createEffect<
    void,
    GetMaterialsActsResponse,
    TErrorResponse
>(() => api.get(ENDPOINTS.material.getMaterialsActs))

sample({
    clock: getMaterialsActs.doneData,
    fn: (res) => res.data.data,
    target: $materialsActs,
})
