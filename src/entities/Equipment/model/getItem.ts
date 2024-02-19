import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TEquipmentItem } from './types/types'

type GetEquipmentItemFxResponse = TResponse<TEquipmentItem>

export const $equipmentItem = createStore<TEquipmentItem>({} as TEquipmentItem)

export const reloadEquipmentItem = createEvent<void>()
export const resetEquipmentItem = createEvent<void>()

$equipmentItem.reset(resetEquipmentItem)

export const getEquipmentItemFx = createEffect<
    number,
    GetEquipmentItemFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.equipment.getItem(id)))

sample({
    clock: getEquipmentItemFx.doneData,
    fn: ({ data }) => data.data,
    target: $equipmentItem,
})
sample({
    source: $equipmentItem,
    clock: reloadEquipmentItem,
    fn: ({ id }) => id,
    target: getEquipmentItemFx,
})
