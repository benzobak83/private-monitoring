import { createEffect, forward } from 'effector'
import { reloadDefect } from '@entities/Defect'
import { TMaterialsAct } from '@entities/Material'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

export const pickActOfMaterial = createEffect<
    WithId<TMaterialsAct & { executionId: number; withoutAct: boolean }>,
    void,
    TErrorResponse
>(({ data, id }) => api.put(ENDPOINTS.defect.pickActOfMaterial(id), data))

forward({ from: pickActOfMaterial.done, to: reloadDefect })
