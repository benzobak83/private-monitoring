import { createEffect, sample } from 'effector'
import { reloadTypesOfEquipmentList } from '@entities/Settings/TypesOfEquipment'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'

export const deleteOfTypeEquipment = createEffect<number, void, TErrorResponse>(
    (id) => {
        return api.delete(ENDPOINTS.settings.typeOfEquipment.delete + id)
    }
)

sample({
    clock: deleteOfTypeEquipment.done,
    fn: () => {},
    target: reloadTypesOfEquipmentList,
})
