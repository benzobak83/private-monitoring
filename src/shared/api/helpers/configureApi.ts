import axios, { AxiosInstance } from 'axios'
import { logoutEvent } from '@/features/Auth/logout'
import { redirectToPrevPage } from '@/features/General/redirectToPrevPage'
import { pushLog } from '../../notification'
import { DEV_BACKEND_URL, PROD_BACKEND_URL } from '../consts/config'
import { TBitrixTokens, TErrorResponse, TResponse } from '../types'
import { additionalTokenNotEmpty } from './additionalApiHelpers'
import { bitrixTokensNotEmpty } from './bitrixApiHelpers'

type Token =
    | {
          type: 'bitrix'
          token: TBitrixTokens | Record<never, never>
      }
    | { type: 'additional'; token: string }

export const getBaseUrl = () => {
    let baseUrl: string
    const url = window.location.href

    const isDevUrl = url.includes('dev') || url.includes('localhost')

    if (isDevUrl) {
        baseUrl = DEV_BACKEND_URL
    } else {
        baseUrl = PROD_BACKEND_URL
    }

    return baseUrl
}

export const apTErrorInterceptor = () => {
    return (error: TErrorResponse) => {
        const code = error.response?.status

        if (code == 401) {
            logoutEvent()
        }

        if (code === 403) {
            redirectToPrevPage()
        }

        const serverErrors = error.response?.data?.errors

        if (serverErrors) {
            serverErrors.forEach((error) => {
                pushLog(error)
            })
        }

        return Promise.reject(error)
    }
}

export const apiResponseInterceptor = () => {
    return (response: TResponse<any>) => {
        return response
    }
}

export const setAdditionalApiHeaders = (api: AxiosInstance, token: string) => {
    if (!additionalTokenNotEmpty) return

    api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export const setBitrixApiHeaders = (
    api: AxiosInstance,
    token: TBitrixTokens | Record<never, never>
) => {
    if (!bitrixTokensNotEmpty()) return

    const verifiedToken = token as TBitrixTokens

    api.defaults.headers['X-Access-Token'] = verifiedToken.AUTH_ID
    api.defaults.headers['X-Refresh-Token'] = verifiedToken.REFRESH_ID
}

export const configureApi = ({ type, token }: Token) => {
    const api = axios.create({
        baseURL: getBaseUrl(),
    })

    api.interceptors.response.use(
        apiResponseInterceptor(),
        apTErrorInterceptor()
    )

    if (type === 'bitrix') {
        setBitrixApiHeaders(api, token)
    }

    if (type === 'additional') {
        setAdditionalApiHeaders(api, token)
    }

    return api
}
