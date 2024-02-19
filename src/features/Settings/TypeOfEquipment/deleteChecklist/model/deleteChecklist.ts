import { createEffect, forward } from 'effector'
import { reloadTypeOfEquipmentItem } from '@entities/Settings/TypesOfEquipment'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'

export const deleteChecklistOfTypeEquipment = createEffect<
    number,
    void,
    TErrorResponse
>((id) => {
    return api.delete(ENDPOINTS.settings.typeOfEquipment.deleteChecklist + id)
})

forward({
    from: deleteChecklistOfTypeEquipment.done,
    to: reloadTypeOfEquipmentItem,
})
