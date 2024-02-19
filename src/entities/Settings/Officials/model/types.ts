import { TypeManager } from '@entities/Dict'
import { TUser } from '@entities/User'

export type TOfficial = {
    id: number
    key: TypeManager
    name: string
    users: TUser[] | null
}
