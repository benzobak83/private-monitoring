import { createEffect } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'
import {
    emitErrorLog,
    emitSuccessLog,
    MESSAGES_FOR_LOG,
} from '@shared/notification'

export const deleteFileFx = createEffect<number, void, TErrorResponse>((id) => {
    return api.delete(ENDPOINTS.multimedia.file.delete(id))
})

deleteFileFx.fail.watch((e) => {
    emitErrorLog(e, MESSAGES_FOR_LOG.error.file.delete)
})
deleteFileFx.doneData.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.file.delete)
})
