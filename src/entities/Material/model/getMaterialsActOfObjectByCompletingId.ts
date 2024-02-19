import { createEffect } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TMaterialsActOfObjectByCompletingId } from './types'

export type TGetMaterialsActOfObjectByCompletingIdRequest = {
    malfunctionId: number
    executionId: number
}

export const getMaterialsActOfObjectByCompletingIdFx = createEffect<
    TGetMaterialsActOfObjectByCompletingIdRequest,
    TResponse<TMaterialsActOfObjectByCompletingId>,
    TErrorResponse
>(({ malfunctionId, executionId }) =>
    api.get(
        ENDPOINTS.material.getMaterialsActOfObjectByCompletingId(
            malfunctionId,
            executionId
        )
    )
)
