import { createEffect, sample } from 'effector'
import { $checklistInspection } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponseId, TErrorResponse } from '@shared/api/types'

export const deleteChecklistItem = createEffect<
    number,
    TResponseId,
    TErrorResponse
>((id) => {
    return api.delete(ENDPOINTS.settings.checklist.item.delete + id)
})

sample({
    source: $checklistInspection,
    clock: deleteChecklistItem.doneData,
    fn: (store, { data }) => {
        const filteredChecklistItems = store.checklistItems.filter(
            (item) => String(item.id) !== String(data.data.id)
        )
        return { ...store, checklistItems: filteredChecklistItems }
    },
    target: $checklistInspection,
})
