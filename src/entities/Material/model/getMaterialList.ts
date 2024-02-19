import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFilter } from '@entities/Filter'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TMaterialItemOfList } from './types'

type GetMaterialListFxRequest = TFilter['material']

type GetMaterialListFxResponse = TResponse<TMaterialItemOfList[]>

export const resetMaterialList = createEvent<void>()

export const $materialList = createStore<TMaterialItemOfList[]>(
    [] as TMaterialItemOfList[]
).reset(resetMaterialList)

export const getMaterialListFx = createEffect<
    GetMaterialListFxRequest,
    GetMaterialListFxResponse,
    TErrorResponse
>((data) => api.get(ENDPOINTS.material.getList, { params: data }))

sample({
    clock: getMaterialListFx.doneData,
    fn: ({ data }) => data.data,
    target: $materialList,
})
