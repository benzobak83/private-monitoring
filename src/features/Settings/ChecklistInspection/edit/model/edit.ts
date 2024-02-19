import { createEffect, sample } from 'effector'
import { $checklistInspection } from '@entities/Settings/ChecklistInspection'
import { TChecklistInspectionWithItems } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { EditChecklistInspectionFormFields } from './formSchema'

export const editChecklistInspection = createEffect<
    WithId<EditChecklistInspectionFormFields>,
    TResponse<TChecklistInspectionWithItems>,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.settings.checklist.edit + '/' + id, data)
})

sample({
    clock: editChecklistInspection.doneData,
    fn: (res) => res.data.data,
    target: $checklistInspection,
})
