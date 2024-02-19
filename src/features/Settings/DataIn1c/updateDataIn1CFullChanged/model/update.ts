import { createEffect } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import {
    $data1CTableData,
    getUpdatedDataIn1CListFx,
} from '@entities/Settings/UpdateDataIn1C'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TUpdateDataIn1CFullChangedRequest } from './types'

export const updateDataIn1CFullFx = createEffect<
    TUpdateDataIn1CFullChangedRequest,
    void,
    ErrorResponse
>((req) => api.post(ENDPOINTS.settings.updateDataIn1C.updateFull, req))

$data1CTableData.on(updateDataIn1CFullFx.doneData, () => {
    getUpdatedDataIn1CListFx()
})
