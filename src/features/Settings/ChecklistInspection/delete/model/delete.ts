import { createEffect, forward } from 'effector'
import { reloadChecklistInspectionList } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'

export const deleteChecklistInspection = createEffect<
    number,
    void,
    TErrorResponse
>((id) => {
    return api.delete(ENDPOINTS.settings.checklist.delete + '/' + id)
})

forward({
    from: deleteChecklistInspection.done,
    to: reloadChecklistInspectionList,
})
