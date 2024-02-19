import { createEffect, createStore } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'
import { TTableData } from '@shared/types/Table'
import { TUpdateData1C } from './types'

export const $data1CTableData = createStore<TTableData<TUpdateData1C[]>>(
    {} as TTableData<TUpdateData1C[]>
)

export const getUpdatedDataIn1CListFx = createEffect<
    void,
    TResponse<TTableData<TUpdateData1C[]>>,
    ErrorResponse
>(() => api.get(ENDPOINTS.settings.updateDataIn1C.getList))

$data1CTableData.on(getUpdatedDataIn1CListFx.doneData, (_, { data }) => {
    console.log(data.data)
    return data.data
})
