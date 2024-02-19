import { createEffect, forward } from 'effector'
import {
    FixMethodTypeIds,
    reloadCompletingWork,
    reloadDefect,
} from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type CompletingWorkFxRequest = {
    comment: string
    method: FixMethodTypeIds
}

export const completingWorkFx = createEffect<
    WithId<CompletingWorkFxRequest> & { executionId: number },
    void,
    TErrorResponse
>(({ data, id, executionId }) => {
    return api.put(ENDPOINTS.defect.completingWork(id, executionId), data)
})

forward({
    from: completingWorkFx.done,
    to: [reloadDefect, reloadCompletingWork],
})
