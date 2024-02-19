import { AxiosResponse } from 'axios'
import { createEffect } from 'effector'
import api from '@shared/api/api'
import { TErrorResponse } from '@shared/api/types'
import { emitErrorLog, emitSuccessLog } from '@shared/notification'
import { getRolesFx } from './Permissions'

type DeleteRoleParams = number
type DeleteRoleResponse = AxiosResponse

export const deleteRoleFx = createEffect<
    DeleteRoleParams,
    DeleteRoleResponse,
    TErrorResponse
>(async (id) => {
    return await api.delete(`admin/rbac/role/` + id)
})

deleteRoleFx.done.watch(() => {
    emitSuccessLog('Роль успешно удалена')
})

deleteRoleFx.fail.watch((e) => {
    emitErrorLog(e, 'Ошибка в удалении роли')
})

deleteRoleFx.finally.watch(() => {
    getRolesFx()
})
