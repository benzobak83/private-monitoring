import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TTaskListItem } from './types'

type GetTasksForTodayTableDataFxResponse = TResponse<
    TTableData<TTaskListItem[]>
>

export const $tasksForTodayTableData = createStore<TTableData<TTaskListItem[]>>(
    {} as TTableData<TTaskListItem[]>
)
export const $tasksForTodayTableDataNeedReload = createStore<boolean>(false)

export const pingForReloadTasksForTodayTabledata = createEvent<void>()

export const getTasksForTodayTableDataFx = createEffect<
    WithId<TTableRequest>,
    GetTasksForTodayTableDataFxResponse,
    TErrorResponse
>(({ data, id }) => api.post(ENDPOINTS.task.getTasksForTodayOfObject(id), data))

sample({
    clock: getTasksForTodayTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $tasksForTodayTableData,
})

sample({
    source: $tasksForTodayTableDataNeedReload,
    clock: pingForReloadTasksForTodayTabledata,
    fn: (store) => !store,
    target: $tasksForTodayTableDataNeedReload,
})
