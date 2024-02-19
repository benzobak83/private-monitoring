import { createEffect, createStore, createEvent, sample } from 'effector'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { TTableData } from '@shared/types/Table'
import { TDefectOfEqupmentListItem } from './types/types'

type GetDefectListOfEquipmentTableDataFxResponse = TResponse<
    TTableData<TDefectOfEqupmentListItem[]>
>

export const reloadDefectListOfEquipmentTabledata = createEvent<void>()
export const resetDefectListOfEquipmentTabledata = createEvent<void>()

export const $defectListOfEquipmentTableData = createStore<
    TTableData<TDefectOfEqupmentListItem[]>
>({} as TTableData<TDefectOfEqupmentListItem[]>).reset(
    resetDefectListOfEquipmentTabledata
)

export const getDefectListOfEquipmentTableDataFx = createEffect<
    number,
    GetDefectListOfEquipmentTableDataFxResponse,
    TErrorResponse
>((id) =>
    api.post(
        ENDPOINTS.defect.getDefectsOfEquipment(id),
        withDefaultTableParams()
    )
)

sample({
    clock: getDefectListOfEquipmentTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $defectListOfEquipmentTableData,
})
