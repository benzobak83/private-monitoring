import { createEffect, forward } from 'effector'
import { FixMethodTypeIds, reloadDefect } from '@entities/Defect'
import { TypeManager } from '@entities/Dict'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type GoToPlanningWorkFxRequest = {
    subdivisionKeys?: TypeManager[] | void[] | null
    method: FixMethodTypeIds
    isMySubdivision?: boolean
}

export const goToPlanningWorkFx = createEffect<
    WithId<GoToPlanningWorkFxRequest> & { diagnosticId: number },
    void,
    TErrorResponse
>(({ id, data, diagnosticId }) => {
    return api.patch(ENDPOINTS.defect.goToPlanningWork(id, diagnosticId), data)
})

forward({ from: goToPlanningWorkFx.done, to: reloadDefect })
