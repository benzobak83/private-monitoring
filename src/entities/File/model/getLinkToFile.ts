import { createEffect } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { emitSuccessLog, MESSAGES_FOR_LOG } from '@shared/notification'

type GetLinkToFileFxResponse = {
    id: number
    externalId?: any
    typeId: number
    hash: string
    link: string
    size: number
    name: string
    createdAt: string
    updatedAt: string
}

export const getLinkToFileFx = createEffect<
    number,
    TResponse<GetLinkToFileFxResponse>,
    TErrorResponse
>(async (id) => {
    return await api.get(ENDPOINTS.multimedia.file.generateUrl(id))
})

getLinkToFileFx.doneData.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.file.dowland)
})
