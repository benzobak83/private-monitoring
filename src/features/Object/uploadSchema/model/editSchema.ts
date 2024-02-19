import { createEffect, sample } from 'effector'
import { reloadSchema } from '@entities/Object'
import { TSchemaOfObject } from '@entities/Object/model/types'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'

type TeditSchemaReq = {
    objectId: number
    fileIds: number[]
    schemaId: number
}

export const editSchemaFx = createEffect<
    TeditSchemaReq,
    TResponse<TSchemaOfObject[]>,
    TErrorResponse
>((data) => {
    return api.put(
        ENDPOINTS.object.editSchema({
            schemaId: data.schemaId,
            objectId: data.objectId,
        }),
        data
    )
})

sample({
    clock: editSchemaFx.doneData,
    target: reloadSchema,
})

editSchemaFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.default)
})
