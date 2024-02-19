import {
    createStore,
    createEffect,
    sample,
    createEvent,
    forward,
} from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { TTableData } from '@shared/types/Table'
import { TSubdivision } from './types'

export const $subdivisionTableData = createStore(
    {} as TTableData<TSubdivision[]>
)

export const reloadSubdivisionTabledata = createEvent<void>()

export const getSubdivisionTableDataFx = createEffect<
    void,
    TResponse<TTableData<TSubdivision[]>>,
    TErrorResponse
>(() => api.post(ENDPOINTS.settings.subdivision.get, withDefaultTableParams()))

sample({
    clock: getSubdivisionTableDataFx.doneData,
    fn: (res) => res.data.data,
    target: $subdivisionTableData,
})

forward({ from: reloadSubdivisionTabledata, to: getSubdivisionTableDataFx })
