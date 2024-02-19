import { createEffect } from 'effector'
import { reloadChecklistWorkItem } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'
import { emitSuccessLog, MESSAGES_FOR_LOG } from '@shared/notification'

export const sortChecklistWorkItemsFx = createEffect<
    WithId<{ checklistItems: number[] }>,
    void,
    TErrorResponse
>(({ id, data }) => {
    return api.put(ENDPOINTS.settings.checklist.sort(id), data)
})

sortChecklistWorkItemsFx.done.watch(() => {
    reloadChecklistWorkItem()
    emitSuccessLog(MESSAGES_FOR_LOG.success.checklist.sort)
})
