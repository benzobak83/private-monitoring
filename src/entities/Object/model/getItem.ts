import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TObjectItem } from './types'

type GetObjectItemFxResponse = TResponse<TObjectItem>

export const $objectItem = createStore<TObjectItem>({} as TObjectItem)

export const reloadObjectItem = createEvent<void>()
export const resetObjectItem = createEvent<void>()

$objectItem.reset(resetObjectItem)

export const getObjectItemFx = createEffect<
    number,
    GetObjectItemFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.object.getItem(id)))

sample({
    clock: getObjectItemFx.doneData,
    fn: ({ data }) => data.data,
    target: $objectItem,
})
sample({
    source: $objectItem,
    clock: reloadObjectItem,
    fn: ({ id }) => id,
    target: getObjectItemFx,
})
