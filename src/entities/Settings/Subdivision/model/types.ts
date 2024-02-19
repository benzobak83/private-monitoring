import { TUser } from '@entities/User'

export type TSubdivision = {
    id: number
    shortName: string
    fullName: string
    user: TUser
}
