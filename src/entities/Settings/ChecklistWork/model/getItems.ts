import { createEffect, createEvent, createStore } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'
import { TChecklistItems } from './types'

//checklistItems
export const $checklistWorkItemsList = createStore<TChecklistItems[]>(
    [] as TChecklistItems[]
)

export const reloadChecklistWorkItemsList = createEvent<void>()

export const getChecklistWorkItemsList = createEffect<
    number,
    TResponse<TChecklistItems[]>,
    ErrorResponse
>((id) => {
    return api.get(ENDPOINTS.settings.checklist.item.get + id)
})

$checklistWorkItemsList.on(
    getChecklistWorkItemsList.doneData,
    (_, { data }) => {
        return data.data
    }
)
