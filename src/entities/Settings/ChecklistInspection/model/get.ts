import {
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
} from 'effector'
import { ErrorResponse } from 'react-router-dom'
import api from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/consts/endpoints'
import { TResponse } from '@shared/api/types'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { TTableData } from '@shared/types/Table'
import { ChecklistType } from '../../Checklist'
import { TChecklistInspection, TChecklistInspectionWithItems } from './types'

//checklist
export const $checklistInspection = createStore<TChecklistInspectionWithItems>(
    {} as TChecklistInspectionWithItems
)
export const $checklistInspectionList = createStore<TChecklistInspection[]>(
    [] as TChecklistInspection[]
)

export const reloadChecklistInspectionList = createEvent<void>()
export const reloadChecklistInspectionItem = createEvent<void>()

export const resetChecklistInspection = createEvent<void>()

$checklistInspection.reset(resetChecklistInspection)

export const getChecklistInspection = createEffect<
    number,
    TResponse<TChecklistInspectionWithItems>,
    ErrorResponse
>((id) => {
    return api.get(ENDPOINTS.settings.checklist.get + '/' + id)
})
export const getChecklistInspectionList = createEffect<
    void,
    TResponse<TTableData<TChecklistInspection[]>>,
    ErrorResponse
>(() => {
    const filter = {
        typeChecklist: ChecklistType.INSPECTION,
    }
    return api.post(
        ENDPOINTS.settings.checklist.getList,
        withDefaultTableParams(filter)
    )
})

$checklistInspection.on(getChecklistInspection.doneData, (_, { data }) => {
    return data.data
})
$checklistInspectionList.on(
    getChecklistInspectionList.doneData,
    (_, { data }) => {
        return data.data.rows
    }
)

forward({ from: reloadChecklistInspectionList, to: getChecklistInspectionList })

sample({
    source: $checklistInspection,
    clock: reloadChecklistInspectionItem,
    fn: (store) => store.id,
    target: getChecklistInspection,
})
