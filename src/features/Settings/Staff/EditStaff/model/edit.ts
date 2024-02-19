import { createEffect, sample } from 'effector'
import { ErrorResponse } from 'react-router-dom'
import { TStaff } from '@entities/Settings/Staff'
import { $staffTableData } from '@entities/Settings/Staff'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse, WithId } from '@shared/api/types'
import { TTableData } from '@shared/types/Table'
import { EditStaffFormFields } from './formSchema'

export const editStaffFx = createEffect<
    WithId<EditStaffFormFields>,
    TResponse<TStaff>,
    ErrorResponse
>(({ data, id }) => {
    return api.put(ENDPOINTS.settings.staff.edit + id, data)
})

sample({
    source: $staffTableData,
    clock: editStaffFx.doneData,
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
