import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { $defect } from './getDefect'
import { TCompletingWork } from './types/completingWork'

type GetCompletingWorkFxResponse = TResponse<TCompletingWork[]>

export const reloadCompletingWork = createEvent<void>()
export const resetCompletingWork = createEvent<void>()

export const $completingWork = createStore<TCompletingWork[]>(
    [] as TCompletingWork[]
).reset(resetCompletingWork)

export const getCompletingWorkFx = createEffect<
    number,
    GetCompletingWorkFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getCompletingWork(id)))

sample({
    clock: getCompletingWorkFx.doneData,
    fn: ({ data }) => data.data,
    target: $completingWork,
})
sample({
    source: $defect,
    clock: reloadCompletingWork,
    fn: ({ id }) => id,
    target: getCompletingWorkFx,
})

export const getCompletingWorkById = (id: number) => {
    return (
        $completingWork.getState().find((work) => {
            return work.id === id
        }) || ({} as TCompletingWork)
    )
}
