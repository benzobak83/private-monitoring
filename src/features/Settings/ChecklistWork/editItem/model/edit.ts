import { createEffect, forward } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { reloadChecklistWorkItem } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'

export const editChecklistItemFx = createEffect<
    any, //TODO: жду фикс с бэка, правильно - {data: EditChecklistItemFormFields, id},
    void,
    ErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.settings.checklist.item.edit + id, data)
})

forward({
    from: editChecklistItemFx.done,
    to: reloadChecklistWorkItem,
})
