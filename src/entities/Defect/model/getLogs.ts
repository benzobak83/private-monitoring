import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TLog } from './types/logs'

export const $logsOfDefect = createStore<TLog[]>([])

export const getLogsOfDefect = createEffect<
    number,
    TResponse<TLog[]>,
    TErrorResponse
>((id) => api.get(ENDPOINTS.defect.getLogs(id)))

sample({
    clock: getLogsOfDefect.doneData,
    fn: (res) => res.data.data,
    target: $logsOfDefect,
})
