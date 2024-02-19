import { createEffect, forward } from 'effector'
import { reloadPlanningWork } from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

export type TAgreementByEmployeeFxRequest = {
    planningApprovalId: number
    sum: number
    comment: string
    status: boolean
}

export const agreementByEmployeeFx = createEffect<
    WithId<TAgreementByEmployeeFxRequest>,
    void,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.defect.agreementByEmployee(id), data)
})

forward({ from: agreementByEmployeeFx.doneData, to: reloadPlanningWork })
