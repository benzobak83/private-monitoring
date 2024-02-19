import { createEffect, createEvent, createStore } from 'effector'
import api from '@shared/api/api'
import { TErrorResponse, TResponse } from '@shared/api/types'
import { emitErrorLog, emitSuccessLog } from '@shared/notification'
import { IPermissionItem, IRoleItem } from './types'

export const $roles = createStore<IRoleItem[]>([])
export const $roleAccessError = createStore<boolean>(false)
export const $permissions = createStore<IPermissionItem[]>([])
export const $permissionsStatus = createStore<'ok' | 'shoudUpdate'>('ok')
export const $permissionsLoading = createStore<boolean>(false)

export const setPermissionsLoadingEvent = createEvent<boolean>()
export const setPermissionsStatus = createEvent<'ok' | 'shoudUpdate'>()
export const setRoleAccessError = createEvent<boolean>()

$permissionsStatus.on(setPermissionsStatus, (_, status) => status)

$roleAccessError.on(setRoleAccessError, (_, isError) => isError)

export const getRolesFx = createEffect<
    void,
    TResponse<IRoleItem[]>,
    TErrorResponse
>(async () => {
    return await api.get('admin/rbac/roles')
})

$roles.on(getRolesFx, () => {
    setPermissionsLoadingEvent(true)
})

$roles.on(getRolesFx.done, (state, { result }) => {
    return result.data.data
})

$roles.on(getRolesFx.fail, (state, error) => {
    if (error.error?.response?.status == 403) {
        setRoleAccessError(true)
    }
    return []
})

$roles.on(getRolesFx.finally, () => {
    setPermissionsLoadingEvent(false)
})

export const updateRoleFx = createEffect<any, TResponse<any>, TErrorResponse>(
    async (data: any) => {
        return await api.patch('admin/rbac/role', data)
    }
)

$roles.on(updateRoleFx.done, () => {
    emitSuccessLog('Роль успешно обновлена')
})

$roles.on(updateRoleFx.finally, () => {
    getPermissionsFx()
    getRolesFx()
})

export const getPermissionsFx = createEffect<
    void,
    TResponse<IPermissionItem[]>,
    TErrorResponse
>(async () => {
    return await api.get('admin/rbac/permissions')
})

$permissions.on(getPermissionsFx.done, (state, { result }) => {
    return result.data.data
})

$permissions.on(getPermissionsFx.fail, (state, error) => {
    if (error.error?.response?.status == 403) {
        setRoleAccessError(true)
    }
})

export const createRoleFx = createEffect<any, any, TErrorResponse>(
    async (data: any) => {
        return await api.post('admin/rbac/role', data)
    }
)

$roles.on(createRoleFx.fail, (e: any) => {
    emitErrorLog(e, 'При создании роли произошла ошибка')
})

$roles.on(createRoleFx.finally, () => {
    getPermissionsFx()
    getRolesFx()
})

createRoleFx.done.watch(() => {
    emitSuccessLog('Роль успешно создана')
})

getRolesFx.watch(() => {
    setPermissionsLoadingEvent(true)
})
getRolesFx.done.watch(() => {
    setPermissionsLoadingEvent(false)
})
getRolesFx.fail.watch((e) => {
    emitErrorLog(e, 'Ошибка в получении ролей')
})

updateRoleFx.fail.watch((e) => {
    emitErrorLog(e, 'Ошибка в обновлении ролей')
})
