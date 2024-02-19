import { createEffect, forward } from 'effector'
import { reloadDefect, reloadPlanningWork } from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type CompletePlanningWorkRequest = {
    dateStart: string
    dateEnd: string
}

export const completePlanningWork = createEffect<
    WithId<CompletePlanningWorkRequest> & { planningId: number },
    void,
    TErrorResponse
>(({ data, id, planningId }) => {
    return api.put(ENDPOINTS.defect.completePlanningWork(id, planningId), data)
})

forward({
    from: completePlanningWork.done,
    to: [reloadDefect, reloadPlanningWork],
})
