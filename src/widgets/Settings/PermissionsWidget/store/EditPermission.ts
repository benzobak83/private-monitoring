import { createEffect, createEvent, createStore } from 'effector'
import api from '@shared/api/api'
import { TErrorResponse } from '@shared/api/types'
import { emitErrorLog, emitSuccessLog } from '@shared/notification'
import { setPermissionsStatus } from './Permissions'
import { IRevokeParams, IRevokeResponse, IRevokeStatus } from './types'

export const $editPermissionStatus = createStore<IRevokeStatus>(null)
export const $permissionFetching = createStore<boolean>(false)

export const setEditPermissionFetching = createEvent<boolean>()
export const setEditPermissionStatus = createEvent<IRevokeStatus>()

export const revokePermissionFx = createEffect<
    IRevokeParams,
    IRevokeResponse,
    TErrorResponse
>(async (permissionData) => {
    return api.post(`admin/rbac/${permissionData.type}-role`, {
        roleId: permissionData.roleId,
        userId: permissionData.userId,
    })
})

$editPermissionStatus.on(setEditPermissionStatus, (_, status) => status)

$editPermissionStatus.on(revokePermissionFx, () => {
    setEditPermissionFetching(true)
})
$editPermissionStatus.on(revokePermissionFx.done, () => {
    setTimeout(() => {
        setEditPermissionStatus(null)
        setPermissionsStatus('ok')
    }, 2000)

    setPermissionsStatus('shoudUpdate')
    return 'success'
})
$editPermissionStatus.on(revokePermissionFx.fail, () => 'error')
$editPermissionStatus.on(revokePermissionFx.finally, () => {
    setEditPermissionFetching(false)
})

revokePermissionFx.watch(() => {
    setEditPermissionStatus('inProgress')
})

revokePermissionFx.fail.watch((e) => {
    emitErrorLog(e, 'Ошибка при изменении прав')
})

revokePermissionFx.done.watch(() => {
    emitSuccessLog('Права успешно изменены')
})
