import { createEffect, sample } from 'effector'
import { reloadSchema } from '@entities/Object'
import { TSchemaOfObject } from '@entities/Object/model/types'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'

type TUploadImageReq = {
    objectId: number
    fileIds: number[]
}

export const uploadImageFx = createEffect<
    WithId<TUploadImageReq>,
    TResponse<TSchemaOfObject[]>,
    TErrorResponse
>(({ data, id }) => {
    return api.post(ENDPOINTS.object.uploadImageToSchema(id), data)
})

sample({
    clock: uploadImageFx.doneData,
    target: reloadSchema,
})

uploadImageFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.object.uploadedImg)
})
