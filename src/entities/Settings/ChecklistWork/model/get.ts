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
import { TChecklistWork, TChecklistWorkWithItems } from './types'

//checklist
export const $checklistWork = createStore<TChecklistWorkWithItems>(
    {} as TChecklistWorkWithItems
)
export const $checklistWorkList = createStore<TChecklistWork[]>(
    [] as TChecklistWork[]
)

export const reloadChecklistWorkList = createEvent<void>()
export const reloadChecklistWorkItem = createEvent<void>()

export const getChecklistWork = createEffect<
    number,
    TResponse<TChecklistWorkWithItems>,
    ErrorResponse
>((id) => {
    return api.get(ENDPOINTS.settings.checklist.get + '/' + id)
})
export const getChecklistWorkList = createEffect<
    void,
    TResponse<TTableData<TChecklistWork[]>>,
    ErrorResponse
>(() => {
    const filter = {
        typeChecklist: ChecklistType.WORKS,
    }
    return api.post(
        ENDPOINTS.settings.checklist.getList,
        withDefaultTableParams(filter)
    )
})

$checklistWork.on(getChecklistWork.doneData, (_, { data }) => {
    return data.data
})
$checklistWorkList.on(getChecklistWorkList.doneData, (_, { data }) => {
    return data.data.rows
})

forward({ from: reloadChecklistWorkList, to: getChecklistWorkList })

sample({
    source: $checklistWork,
    clock: reloadChecklistWorkItem,
    fn: (store) => store.id,
    target: getChecklistWork,
})
