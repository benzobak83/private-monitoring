import { createEffect, sample } from 'effector'
import { $checklistWork } from '@entities/Settings/ChecklistWork'
import { TChecklistWorkWithItems } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { EditChecklistWorkFormFields } from './formSchema'

export const editChecklistWork = createEffect<
    WithId<EditChecklistWorkFormFields>,
    TResponse<TChecklistWorkWithItems>,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.settings.checklist.edit + '/' + id, data)
})

sample({
    clock: editChecklistWork.doneData,
    fn: (res) => res.data.data,
    target: $checklistWork,
})
