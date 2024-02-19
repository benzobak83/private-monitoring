import { createEffect, sample } from 'effector'
import { $defect, TDefect } from '@entities/Defect'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'
import { EditPriorityFormFields } from './formSchema'

export const editPriorityFx = createEffect<
    WithId<EditPriorityFormFields>,
    TResponse<TDefect>,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.defect.editPriority(id), data)
})

editPriorityFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.defect.editPriority)
})

sample({
    clock: editPriorityFx.doneData,
    fn: (res) => res.data.data,
    target: $defect,
})
