import { createEffect, sample } from 'effector'
import { TOperatingTime, getOperatingTimeFx } from '@entities/Equipment'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { AddOperatingTimeFormFields } from './formSchema'

export const addOperatingTimeFx = createEffect<
    WithId<AddOperatingTimeFormFields>,
    TResponse<TOperatingTime>,
    TErrorResponse
>(({ data, id }) => api.post(ENDPOINTS.equipment.addOperatingTime(id), data))

sample({
    clock: addOperatingTimeFx.done,
    fn: ({ params }) => params.id,
    target: getOperatingTimeFx,
})
