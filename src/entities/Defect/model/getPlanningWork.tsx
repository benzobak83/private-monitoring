import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { $defect } from './getDefect'
import { TPlanningWork } from './types/planningWork'

type GetPlanningWorkFxResponse = TResponse<TPlanningWork[]>

export const reloadPlanningWork = createEvent<void>()
export const resetPlanningWork = createEvent<void>()

export const $planningWork = createStore<TPlanningWork[]>(
    [] as TPlanningWork[]
).reset(resetPlanningWork)

export const getPlanningWorkFx = createEffect<
    number,
    GetPlanningWorkFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getPlanningWork(id)))

sample({
    clock: getPlanningWorkFx.doneData,
    fn: ({ data }) => data.data,
    target: $planningWork,
})
sample({
    source: $defect,
    clock: reloadPlanningWork,
    fn: ({ id }) => id,
    target: getPlanningWorkFx,
})

export const getPlanningWorkById = (id: number) => {
    return $planningWork.getState().find((work) => {
        return work.id === id
    })
}
