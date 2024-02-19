import { createEffect, sample } from 'effector'
import { CheckModel, TCheck } from '@entities/Check'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'

type TCompleteCheckFxRequest = WithId<
    {
        checklistId: number
    } & { answers: Array<{ checklistItemId: number; answerOptionId: number }> }
>

export const completeCheckFx = createEffect<
    TCompleteCheckFxRequest,
    TResponse<TCheck>,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.check.complete(id), data)
})

sample({
    clock: completeCheckFx.doneData,
    fn: ({ data }) => data.data,
    target: CheckModel.$check,
})

completeCheckFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.check.completed)
})
