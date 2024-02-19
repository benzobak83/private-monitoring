import { createEffect } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import {
    $data1CTableData,
    getUpdatedDataIn1CListFx,
} from '@entities/Settings/UpdateDataIn1C'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TUpdateDataIn1COnlyChangedRequest } from './types'

export const updateDataOnlyChangedFx = createEffect<
    TUpdateDataIn1COnlyChangedRequest,
    void,
    ErrorResponse
>((req) => api.put(ENDPOINTS.settings.updateDataIn1C.updateOnlyChanged, req))

$data1CTableData.on(updateDataOnlyChangedFx.doneData, () => {
    getUpdatedDataIn1CListFx()
})
