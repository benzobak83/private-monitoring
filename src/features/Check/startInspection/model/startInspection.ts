import { createEffect, sample } from 'effector'
import { CheckModel, TCheck } from '@entities/Check'
import { reloadObjectItem } from '@entities/Object'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitErrorLog } from '@shared/notification'

export type TStartInspectionFxRequest = {
    objectId?: number
    checklistId: number | undefined
}

export const startInspectionFx = createEffect<
    TStartInspectionFxRequest,
    TResponse<TCheck>,
    TErrorResponse
>((data) => {
    return api.post(ENDPOINTS.object.startInspection, data)
})

sample({
    clock: startInspectionFx.doneData,
    fn: (res) => {
        return res.data.data
    },
    target: CheckModel.$check,
})
sample({
    clock: startInspectionFx.doneData,
    target: reloadObjectItem,
})

startInspectionFx.fail.watch(() => {
    emitErrorLog(undefined, MESSAGES_FOR_LOG.error.object.state.startInspection)
})
