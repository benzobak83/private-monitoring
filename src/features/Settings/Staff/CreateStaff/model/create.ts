import { createEffect, sample } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { $staffTableData, TStaff } from '@entities/Settings/Staff'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse, WithId } from '@shared/api/types'
import { TTableData } from '@shared/types/Table'
import { CreateStaffFormFields } from './formSchema'

export const createStaffFx = createEffect<
    WithId<CreateStaffFormFields>,
    TResponse<TStaff>,
    ErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.settings.staff.create + id, data)
})

sample({
    source: $staffTableData,
    clock: createStaffFx.doneData,
    fn: (store, { data }) => {
        const clonedStore = structuredClone(store) as TTableData<TStaff[]>
        const staffFromRes = data.data

        const index = clonedStore.rows.findIndex(
            (staff) => staff.id === staffFromRes.id
        )

        clonedStore.rows[index] = staffFromRes

        return clonedStore
    },
    target: $staffTableData,
})
