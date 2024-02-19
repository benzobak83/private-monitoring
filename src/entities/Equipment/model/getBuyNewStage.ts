import { createEffect, createEvent, createStore } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'
import { TBuyNewStage } from './types/types'

export const resetBuyNewStage = createEvent<void>()

export const $buyNewStage = createStore<TBuyNewStage>({} as TBuyNewStage).reset(
    resetBuyNewStage
)

export const getBuyNewStageFx = createEffect<
    number,
    TBuyNewStage,
    TErrorResponse
>((id) => {
    return api.get(ENDPOINTS.defect.getBuyNewStage(id))
})
