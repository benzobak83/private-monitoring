import { createEffect } from 'effector'
import { reloadChecklistInspectionItem } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'
import { emitSuccessLog, MESSAGES_FOR_LOG } from '@shared/notification'

export const sortChecklistInspectionItemsFx = createEffect<
    WithId<{ checklistItems: number[] }>,
    void,
    TErrorResponse
>(({ id, data }) => {
    return api.put(ENDPOINTS.settings.checklist.sort(id), data)
})

sortChecklistInspectionItemsFx.done.watch(() => {
    reloadChecklistInspectionItem()
    emitSuccessLog(MESSAGES_FOR_LOG.success.checklist.sort)
})
