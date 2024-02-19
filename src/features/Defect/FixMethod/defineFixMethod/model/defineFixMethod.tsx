import { createEffect, forward } from 'effector'
import { FixMethodTypeIds, reloadDefect } from '@entities/Defect'
import { reloadFixMethod } from '@entities/Defect/model/getFixMethod'
import { TypeManager } from '@entities/Dict'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'

type DefineFixMethodRequest = {
    comment?: string
    fileIds?: number[]
    isDispatcherService?: boolean
    method: FixMethodTypeIds
    subdivisionKeys?: TypeManager[]
    sum?: number | string
    isMySubdivision?: boolean
}

export const defineFixMethodFx = createEffect<
    WithId<DefineFixMethodRequest>,
    any,
    TErrorResponse
>(({ id, data }) => {
    return api.put(ENDPOINTS.defect.defineFixMethod(id), data)
})

forward({ from: defineFixMethodFx.done, to: [reloadDefect, reloadFixMethod] })
