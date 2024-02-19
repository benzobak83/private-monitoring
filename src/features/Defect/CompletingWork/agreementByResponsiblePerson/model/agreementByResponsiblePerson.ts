import { createEffect, forward } from 'effector'
import { reloadCompletingWork, reloadDefect } from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

export type TAgreementByResponsiblePersonFxRequest = {
    executionApprovalId: number
    comment: string
    status: boolean
}

export const agreementByResponsiblePersonFx = createEffect<
    WithId<TAgreementByResponsiblePersonFxRequest>,
    void,
    TErrorResponse
>(({ data, id }) => {
    return api.put(
        ENDPOINTS.defect.agreementByResponsiblePersonCompletingWork(id),
        data
    )
})

forward({
    from: agreementByResponsiblePersonFx.doneData,
    to: [reloadCompletingWork, reloadDefect],
})
