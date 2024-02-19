import { createEffect } from 'effector'
import api from '@shared/api/api'

export const deletePermissionFx = createEffect(
    async (permissionData: { roleId: number }) => {
        return api.delete(`admin/rbac/role/` + permissionData.roleId)
    }
)
