import {
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
} from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TUnfinishedTask } from './types'

type GetUnfinishedTasksFxResponse = TResponse<TUnfinishedTask>

const resetUnfinishedTasks = createEvent()
const reloadUnfinishedTasks = createEvent()

export const $unfinishedTasks = createStore<TUnfinishedTask>(
    {} as TUnfinishedTask
).reset(resetUnfinishedTasks)

export const getUnfinishedTasksFx = createEffect<
    void,
    GetUnfinishedTasksFxResponse,
    TErrorResponse
>(() => {
    return api.get(ENDPOINTS.task.getUnfinishedTasks)
})

forward({ from: reloadUnfinishedTasks, to: getUnfinishedTasksFx })

sample({
    clock: getUnfinishedTasksFx.doneData,
    fn: (res) => res.data.data,
    target: $unfinishedTasks,
})
