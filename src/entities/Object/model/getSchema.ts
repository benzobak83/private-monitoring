import { createEffect, createStore, createEvent, sample } from 'effector'
import { TFile } from '@entities/File'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { TSchemaOfObject } from './types'

type GetSchemaFxResponse = TResponse<TSchemaOfObject[]>

export const $schema = createStore<TSchemaOfObject[]>([] as TSchemaOfObject[])
export const $imageOfSchema = $schema?.map(
    (state) =>
        state?.find((item) => item.name === 'image') || ({} as TSchemaOfObject)
)
export const $filesOfSchema = $schema?.map(
    (state) =>
        state?.find((item) => item.name === 'file') ||
        ({ files: [] as TFile[] } as TSchemaOfObject)
)

export const reloadSchema = createEvent<void>()

export const getSchemaFx = createEffect<
    number,
    GetSchemaFxResponse,
    TErrorResponse
>((id) => api.get(ENDPOINTS.object.getSchema(id)))

sample({
    clock: getSchemaFx.doneData,
    fn: ({ data }) => {
        return data.data
    },
    target: $schema,
})
sample({
    clock: reloadSchema,
    fn: () => {
        const objectId = window.location.pathname.replace(/[^0-9]/g, '')

        return Number(objectId)
    },
    target: getSchemaFx,
})
