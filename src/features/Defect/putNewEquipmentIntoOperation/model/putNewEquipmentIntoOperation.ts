import { createEffect } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type TPutNewEquipmentIntoOperationFxRequest = WithId<{
    equipmentOld: string
    equipmentNew: string
}>

export const putNewEquipmentIntoOperationFx = createEffect<
    TPutNewEquipmentIntoOperationFxRequest,
    void,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.defect.putNewEquipmentIntoOperation(id), data)
})
