import { createEffect, forward } from 'effector'
import { reloadChecklistInspectionItem } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponseId } from '@shared/api/types'

export const deleteInspectionAnswerOption = createEffect<
    number,
    TResponseId,
    TErrorResponse
>((id) => {
    return api.delete(ENDPOINTS.settings.checklist.item.deleteAnswerOption + id)
})

forward({
    from: deleteInspectionAnswerOption.done,
    to: reloadChecklistInspectionItem,
})
