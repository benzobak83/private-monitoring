import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TEquipmentStatistics } from './types/types'

export const $equipmentStatistics = createStore<TEquipmentStatistics>(
    {} as TEquipmentStatistics
)

export const getEquipmentStatisticsFx = createEffect<
    void,
    TResponse<TEquipmentStatistics>,
    TErrorResponse
>(() => api.get(ENDPOINTS.equipment.getStatistics))

sample({
    clock: getEquipmentStatisticsFx.doneData,
    fn: (data) => data.data.data,
    target: $equipmentStatistics,
})
