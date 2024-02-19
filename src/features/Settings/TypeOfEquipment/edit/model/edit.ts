import { createEffect } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { EditTypeOfEquipmentFormFields } from '@/widgets/Settings/TypeOfEquipment/EditTypeOfEquipment'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { WithId } from '@shared/api/types'
import { clearEmptyFields } from '@shared/lib/helpers/clearEmptyFields'

export const editTypeOfEquipmentFx = createEffect<
    WithId<EditTypeOfEquipmentFormFields>,
    void,
    ErrorResponse
>(({ data, id }) => {
    const filteredData = {
        ...clearEmptyFields(data),
    }
    return api.put(ENDPOINTS.settings.typeOfEquipment.edit + id, filteredData)
})
