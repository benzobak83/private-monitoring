import { createEffect, forward } from 'effector'
import { reloadChecklistWorkList } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'

export const deleteChecklistWork = createEffect<number, void, TErrorResponse>(
    (id) => {
        return api.delete(ENDPOINTS.settings.checklist.delete + '/' + id)
    }
)

forward({
    from: deleteChecklistWork.done,
    to: reloadChecklistWorkList,
})
