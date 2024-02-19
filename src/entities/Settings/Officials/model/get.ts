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
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { TTableData } from '@shared/types/Table'
import { TOfficial } from './types'

export const $officialsTableData = createStore<TTableData<TOfficial[]>>(
    {} as TTableData<TOfficial[]>
)

export const reloadOfficialsTableData = createEvent<void>()
export const resetOfficialsTableData = createEvent<void>()

$officialsTableData.reset(resetOfficialsTableData)

export const getOfficialsTableDataFx = createEffect<
    void,
    TResponse<TTableData<TOfficial[]>>,
    TErrorResponse
>(() => {
    return api.post(ENDPOINTS.settings.official.get, withDefaultTableParams())
})

sample({
    clock: getOfficialsTableDataFx.doneData,
    fn: (store) => store.data.data,
    target: $officialsTableData,
})

forward({ from: reloadOfficialsTableData, to: getOfficialsTableDataFx })
