import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { DefectTypeIds } from './types/types'

export type TDefectGraph = {
    date: string
    id: number
    result: {
        id: DefectTypeIds
        name: string
    }
}[]

export const $defectGraph = createStore<TDefectGraph | null>(null)

export const getDefectGraphFx = createEffect<
    number,
    TResponse<TDefectGraph>,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getGraph(id)))

sample({
    clock: getDefectGraphFx.doneData,
    fn: (res) => res.data.data,
    target: $defectGraph,
})
