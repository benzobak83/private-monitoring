import { AxiosError, AxiosResponse } from 'axios'

export type TResponse<Data> = AxiosResponse<{
    data: Data
    errors: TError[]
    exception: string | null
    success: boolean
}>

export type TResponseId = TResponse<{ id: number }>

export type WithId<Data> = {
    id: number
    data: Data
}

export type TErrorTypes = 'logic' | 'validation' | 'critical' | 'success'

export type TError = {
    message: string
    type: TErrorTypes
    link?: string
    attribute?: string
    id: string
}

export type TBitrixTokens = {
    AUTH_ID: string
    REFRESH_ID: string
}

export type TErrorResponse = AxiosError<{ errors: TError[]; exception: string }>

export type TAxiosMethods = 'get' | 'post' | 'put' | 'delete'
