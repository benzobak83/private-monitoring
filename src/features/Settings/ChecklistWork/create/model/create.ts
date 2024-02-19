import { createEffect, forward } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { ChecklistType } from '@entities/Settings/Checklist'
import { reloadChecklistWorkList } from '@entities/Settings/ChecklistWork'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { CreateChecklistWorkFormFields } from './formSchema'

export const createChecklistWorkFx = createEffect<
    CreateChecklistWorkFormFields,
    void,
    ErrorResponse
>((data) => {
    const filteredData = {
        ...data,
        typeChecklist: ChecklistType.WORKS,
    }
    return api.post(ENDPOINTS.settings.checklist.create, filteredData)
})

forward({
    from: createChecklistWorkFx.done,
    to: reloadChecklistWorkList,
})
