import { createEffect } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type TransferWorkToHeadOfTheDepartmentRequest = {
    comment: string
}

export const transferWorkToHeadOfTheDepartmentFx = createEffect<
    WithId<TransferWorkToHeadOfTheDepartmentRequest>,
    void,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.defect.transferWorkToHeadOfTheDepartment(id), data)
})
