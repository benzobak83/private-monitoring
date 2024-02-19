import { createEffect, createEvent, createStore } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'
import { TChecklistItems } from './types'

//checklistItems
export const $checklistInspectionItemsList = createStore<TChecklistItems[]>(
    [] as TChecklistItems[]
)

export const reloadChecklistInspectionItemsList = createEvent<void>()

export const getChecklistInspectionItemsList = createEffect<
    number,
    TResponse<TChecklistItems[]>,
    ErrorResponse
>((id) => {
    return api.get(ENDPOINTS.settings.checklist.item.get + id)
})

$checklistInspectionItemsList.on(
    getChecklistInspectionItemsList.doneData,
    (_, { data }) => {
        return data.data
    }
)
