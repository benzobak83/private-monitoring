import { createEffect, createStore, createEvent, sample } from 'effector'
import { ChecklistType } from '@entities/Settings/Checklist'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TErrorResponse, TResponse, WithId } from '@shared/api/types'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { THistoryOfRegulatoryWorkCheckForEquipmentListItem } from './types/types'

type GetHistoryOfRegulatoryWorkCheckForEquipmentTableDataFxResponse = TResponse<
    TTableData<THistoryOfRegulatoryWorkCheckForEquipmentListItem[]>
>

export const $historyOfRegulatoryWorkCheckForEquipmentTableData = createStore<
    TTableData<THistoryOfRegulatoryWorkCheckForEquipmentListItem[]>
>({} as TTableData<THistoryOfRegulatoryWorkCheckForEquipmentListItem[]>)
export const $historyOfRegulatoryWorkCheckForEquipmentTableDataNeedReload =
    createStore<boolean>(false)

export const pingForReloadHistoryOfRegulatoryWorkCheckForEquipmentTabledata =
    createEvent<void>()

export const getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx =
    createEffect<
        WithId<TTableRequest>,
        GetHistoryOfRegulatoryWorkCheckForEquipmentTableDataFxResponse,
        TErrorResponse
    >(({ data, id }) => {
        const filteredData = {
            ...data,
            filter: { typeChecklist: ChecklistType.WORKS },
        }
        return api.post(
            ENDPOINTS.check.getHistoryForEquipment(id),
            filteredData
        )
    })

sample({
    clock: getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx.doneData,
    fn: ({ data }) => data.data,
    target: $historyOfRegulatoryWorkCheckForEquipmentTableData,
})

sample({
    source: $historyOfRegulatoryWorkCheckForEquipmentTableDataNeedReload,
    clock: pingForReloadHistoryOfRegulatoryWorkCheckForEquipmentTabledata,
    fn: (store) => !store,
    target: $historyOfRegulatoryWorkCheckForEquipmentTableDataNeedReload,
})
