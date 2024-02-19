import { createEffect, sample } from 'effector'
import { reloadSubdivisionTabledata } from '@entities/Settings/Subdivision'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, WithId } from '@shared/api/types'
import { EditSubdivisionFormFields } from './formSchema'

export const editSubdivisionFx = createEffect<
    WithId<EditSubdivisionFormFields>,
    void,
    TErrorResponse
>(({ id, data }) => api.put(ENDPOINTS.settings.subdivision.edit + id, data))

sample({
    clock: editSubdivisionFx.done,
    fn: () => {},
    target: reloadSubdivisionTabledata,
})
