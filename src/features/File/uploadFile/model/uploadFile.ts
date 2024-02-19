import { createEffect } from 'effector'
import { TFile } from '@entities/File/model/types'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { emitSuccessLog, MESSAGES_FOR_LOG } from '@shared/notification'

type TFileReq = {
    formData: FormData
}

export const uploadFileFx = createEffect<TFileReq, TFile, TErrorResponse>(
    ({ formData }) => {
        return api
            .post(ENDPOINTS.multimedia.file.upload, formData)
            .then((res: TResponse<TFile>) => res?.data.data)
    }
)

uploadFileFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.file.upload)
})
