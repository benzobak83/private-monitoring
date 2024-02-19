import { createEffect, forward } from 'effector'
import { reloadChecklistWorkItem } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponseId } from '@shared/api/types'

export const deleteWorkAnswerOption = createEffect<
    number,
    TResponseId,
    TErrorResponse
>((id) => {
    return api.delete(ENDPOINTS.settings.checklist.item.deleteAnswerOption + id)
})

forward({
    from: deleteWorkAnswerOption.done,
    to: reloadChecklistWorkItem,
})
