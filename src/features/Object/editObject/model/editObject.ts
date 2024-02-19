import { createEffect, sample } from 'effector'
import { merge } from 'lodash'
import { $objectItem } from '@entities/Object'
import { TChecklistInspection } from '@entities/Settings/ChecklistInspection'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { MESSAGES_FOR_LOG, emitSuccessLog } from '@shared/notification'
import { EditObjectFormFields } from './formSchema'

export const editObjectFx = createEffect<
    WithId<EditObjectFormFields>,
    TResponse<{ checklists: TChecklistInspection }>,
    TErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.object.attachToChecklist(id), data)
})

sample({
    source: $objectItem,
    clock: editObjectFx.doneData,
    fn: (object, res) => {
        const checklist = res.data.data.checklists
        const result = { ...merge(object, { checklist }) }
        return result
    },
    target: $objectItem,
})

editObjectFx.done.watch(() => {
    emitSuccessLog(MESSAGES_FOR_LOG.success.object.attachToChecklist)
})
