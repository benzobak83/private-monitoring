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
import { LOCAL_STORAGE_KEY_PAGE } from '@shared/lib/consts/localStorageKeys'
import { getValueFromLocalStorageByKeyWithPath } from '@shared/lib/helpers/getValueFromLocalStorageByKeyWithPath'
import { TTableData, TTableRequest } from '@shared/types/Table'
import { TTypeOfEquipment } from './types'

//checklist
export const $typeOfEquipment = createStore<TTypeOfEquipment>(
    {} as TTypeOfEquipment
)
export const $typesOfEquipmentTableData = createStore<
    TTableData<TTypeOfEquipment[]>
>({} as TTableData<TTypeOfEquipment[]>)

export const resetTypeOfEquipment = createEvent<void>()
export const resetTypesOfEquipmentTableData = createEvent<void>()
export const reloadTypesOfEquipmentList = createEvent<void>()
export const reloadTypeOfEquipmentItem = createEvent<void>()

$typesOfEquipmentTableData.reset(resetTypesOfEquipmentTableData)
$typeOfEquipment.reset(resetTypeOfEquipment)

export const getTypeOfEquipmentFx = createEffect<
    number,
    TResponse<TTypeOfEquipment>,
    ErrorResponse
>((id) => {
    return api.get(ENDPOINTS.settings.typeOfEquipment.get + id)
})
export const getTypesOfEquipmentListFx = createEffect<
    TTableRequest | void,
    TResponse<TTableData<TTypeOfEquipment[]>>,
    ErrorResponse
>((data) => {
    const dataFromLS = getValueFromLocalStorageByKeyWithPath(
        LOCAL_STORAGE_KEY_PAGE
    )
    return api.post(
        ENDPOINTS.settings.typeOfEquipment.getList,
        data || dataFromLS
    )
})

$typeOfEquipment.on(getTypeOfEquipmentFx.doneData, (_, { data }) => {
    return data.data
})
$typesOfEquipmentTableData.on(
    getTypesOfEquipmentListFx.doneData,
    (_, { data }) => {
        return data.data
    }
)

forward({ from: reloadTypesOfEquipmentList, to: getTypesOfEquipmentListFx })

sample({
    source: $typeOfEquipment,
    clock: reloadTypeOfEquipmentItem,
    fn: (store) => store.id,
    target: getTypeOfEquipmentFx,
})
