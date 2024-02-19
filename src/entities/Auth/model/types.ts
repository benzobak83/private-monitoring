import { TIdWithName } from '@shared/types/Global'

export type TAuth<T extends object> = {
    isLogin: boolean
    message: string
    isFetching: boolean
    user: T
    accessFlags: TAccessFlags
}

export type TUser = {
    name: string
    id: number
    isActive: boolean
    isBitrix24User: boolean
    subdivision: TIdWithName
    phone: string
    workPosition: string
}

export type TAccessFlags = {
    any: any //TODO: type
}
