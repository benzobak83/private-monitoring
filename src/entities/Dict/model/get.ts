import { createEffect, createStore, sample } from 'effector'
import api from '@shared/api/api'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TDict } from './types'

export const $dict = createStore<TDict>({} as TDict)

export const getDict = createEffect<void, TResponse<TDict>, TErrorResponse>(
    () => {
        return api.get('pub/dictionary/')
    }
)

sample({
    clock: getDict.doneData,
    fn: (res) => res.data.data,
    target: $dict,
})
