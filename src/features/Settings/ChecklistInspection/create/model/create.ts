import { createEffect, forward } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { ChecklistType } from '@entities/Settings/Checklist'
import { reloadChecklistInspectionList } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { CreateChecklistInspectionFormFields } from './formSchema'

export const createChecklistInspectionFx = createEffect<
    CreateChecklistInspectionFormFields,
    void,
    ErrorResponse
>((data) => {
    const filteredData = {
        ...data,
        typeChecklist: ChecklistType.INSPECTION,
    }
    return api.post(ENDPOINTS.settings.checklist.create, filteredData)
})

forward({
    from: createChecklistInspectionFx.done,
    to: reloadChecklistInspectionList,
})
