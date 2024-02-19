import { createEffect, sample } from 'effector'
import { reloadSchema } from '@entities/Object'
import { TSchemaOfObject } from '@entities/Object/model/types'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'

export type TUploadFileReq = {
    objectId: number
    fileIds: number[]
}

export const uploadFileFx = createEffect<
    WithId<TUploadFileReq>,
    TResponse<TSchemaOfObject>,
    TErrorResponse
>(({ data, id }) => {
    return api.post(ENDPOINTS.object.uploadFileToSchema(id), data)
})

sample({
    clock: uploadFileFx.doneData,
    target: reloadSchema,
})

uploadFileFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.file.uploaded)
})
