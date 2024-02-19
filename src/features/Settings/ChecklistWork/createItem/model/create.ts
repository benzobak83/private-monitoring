import { createEffect, forward } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { reloadChecklistWorkItem } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'

export const createChecklistItemFx = createEffect<
    any, //TODO: жду фикс с бэка, правильно - CreateChecklistItemFormFields & { checklistId: number }
    void,
    ErrorResponse
>((data) => {
    return api.post(ENDPOINTS.settings.checklist.item.create, data)
})

forward({
    from: createChecklistItemFx.done,
    to: reloadChecklistWorkItem,
})
