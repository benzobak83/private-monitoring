import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TChecklistForSelect } from './types'

export const $checklistsForSelect = createStore<TChecklistForSelect[]>([])

export const getChecklistsForSelectFx = createEffect<
    void,
    TResponse<TChecklistForSelect[]>,
    TErrorResponse
>(() => {
    return api.get(ENDPOINTS.settings.checklist.getForSelect)
})

sample({
    clock: getChecklistsForSelectFx.doneData,
    fn: (res) => res.data.data,
    target: $checklistsForSelect,
})
