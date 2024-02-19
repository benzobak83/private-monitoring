import { createEffect, forward } from 'effector'
import {
    reloadCompletingWork,
    reloadDefect,
    reloadPlanningWork,
} from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'

export const goToCompletingWork = createEffect<
    { planningId: number; defectId: number },
    void,
    TErrorResponse
>(({ defectId, planningId }) => {
    return api.patch(ENDPOINTS.defect.goToCompletingWork(defectId, planningId))
})

forward({
    from: goToCompletingWork.done,
    to: [reloadCompletingWork, reloadDefect, reloadPlanningWork],
})
