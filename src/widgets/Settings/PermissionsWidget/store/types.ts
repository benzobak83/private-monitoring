import { TResponse } from '@shared/api/types'

// Permissions store types
export interface IPermissionUser {
    id: number
    name: string
}

export interface IPermissionItem {
    id: number
    key: string
    name: string
}

export interface IRolePermissionItem {
    id: number
    name: string
}

export interface IRoleItem {
    id: number
    key: string
    name: string
    permissions: IRolePermissionItem[]
    users: IPermissionUser[]
}

// Revoke Permission types
export type IRevokeStatus = null | 'inProgress' | 'success' | 'error'

export interface IRevokeParams {
    userId: number
    roleId: number
    type: 'revoke' | 'grant'
}

export type IRevokeResponse = TResponse<any>
