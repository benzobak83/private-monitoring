import { createEffect, forward } from 'effector'
import { reloadFixMethod } from '@entities/Defect/model/getFixMethod'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type AgreementByResponsiblePersonRequest = {
    diagnosticAgreementId: number
    sum?: number | null
    commnet?: string
    answer: string
}

export const agreementByResponsiblePersonFx = createEffect<
    WithId<AgreementByResponsiblePersonRequest>,
    void,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.defect.agreementByResponsiblePerson(id), data)
})

forward({ from: agreementByResponsiblePersonFx.done, to: reloadFixMethod })
