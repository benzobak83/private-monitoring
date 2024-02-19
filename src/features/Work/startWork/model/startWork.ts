import { createEffect, sample } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { $currentWork, TWork } from '@entities/Work'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'
import { StartWorkFormFields } from './formSchema'

export const startWorkFx = createEffect<
    StartWorkFormFields,
    TResponse<TWork>,
    ErrorResponse
>((data) => {
    return api.post(ENDPOINTS.work.startWork, data)
})

sample({
    clock: startWorkFx.doneData,
    fn: (res) => res.data.data,
    target: $currentWork,
})
