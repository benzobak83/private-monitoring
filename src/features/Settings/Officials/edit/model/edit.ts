import { createEffect, sample } from 'effector'
import { reloadOfficialsTableData } from '@entities/Settings/Officials'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse } from '@shared/api/types'
import { clearEmptyFields } from '@shared/lib/helpers/clearEmptyFields'
import { EditOfficialsFormFields } from './formSchema'

export const editOfficialsFx = createEffect<
    EditOfficialsFormFields,
    void,
    TErrorResponse
>((data) => {
    const filteredData = {
        ...clearEmptyFields(data),
    }
    return api.post(ENDPOINTS.settings.official.create, filteredData)
})

sample({
    clock: editOfficialsFx.doneData,
    fn: () => {},
    target: reloadOfficialsTableData,
})
