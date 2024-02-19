import { createEffect, sample } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { $currentWork, TWork, reloadWorklistTabledata } from '@entities/Work'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'

export const completeWorkFx = createEffect<
    number,
    TResponse<TWork>,
    ErrorResponse
>((id) => {
    return api.put(ENDPOINTS.work.completeWork(id))
})

sample({
    clock: completeWorkFx.done,
    target: reloadWorklistTabledata,
})

sample({
    clock: completeWorkFx.doneData,
    fn: (res) => res.data.data,
    target: $currentWork,
})
