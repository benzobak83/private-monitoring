import { createEffect, createStore, createEvent, sample } from 'effector'
import { ChecklistType } from '@entities/Settings/Checklist'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { THistoryOfInspectionCheckForEquipmentListItem } from './types/types'

type GetHistoryOfInspectionCheckForEquipmentTableDataFxResponse = TResponse<
    TTableData<THistoryOfInspectionCheckForEquipmentListItem[]>
>

export const $historyOfInspectionCheckForEquipmentTableData = createStore<
    TTableData<THistoryOfInspectionCheckForEquipmentListItem[]>
>({} as TTableData<THistoryOfInspectionCheckForEquipmentListItem[]>)
export const $historyOfInspectionCheckForEquipmentTableDataNeedReload =
    createStore<boolean>(false)

export const pingForReloadHistoryOfInspectionCheckForEquipmentTabledata =
    createEvent<void>()

export const getHistoryOfInspectionCheckForEquipmentTableDataFx = createEffect<
    WithId<TTableRequest>,
    GetHistoryOfInspectionCheckForEquipmentTableDataFxResponse,
    TErrorResponse
>(({ data, id }) => {
    const filteredData = {
        ...data,
        filter: { typeChecklist: ChecklistType.INSPECTION },
    }
    return api.post(ENDPOINTS.check.getHistoryForEquipment(id), filteredData)
})

sample({
    clock: getHistoryOfInspectionCheckForEquipmentTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $historyOfInspectionCheckForEquipmentTableData,
})

sample({
    source: $historyOfInspectionCheckForEquipmentTableDataNeedReload,
    clock: pingForReloadHistoryOfInspectionCheckForEquipmentTabledata,
    fn: (store) => !store,
    target: $historyOfInspectionCheckForEquipmentTableDataNeedReload,
})
