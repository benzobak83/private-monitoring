import { LOCAL_STORAGE_BITRIX_TOKEN_KEY } from '../../lib/consts/localStorageKeys'
import { TBitrixTokens } from '../types'

export const getBitrixTokensFromLocalStorage = ():
    | TBitrixTokens
    | Record<never, never> => {
    return JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_BITRIX_TOKEN_KEY) || '{}'
    ) as TBitrixTokens | Record<never, never>
}

export const getBitrixTokensFromSearchQuery = () => {
    const url = new URL(location.href)
    const queryParams = url.searchParams

    const tokensFromSearchParams = {
        AUTH_ID: queryParams.get('AUTH_ID'),
        REFRESH_ID: queryParams.get('REFRESH_ID'),
    }

    if (!tokensFromSearchParams.AUTH_ID || !tokensFromSearchParams.REFRESH_ID) {
        return ''
    }
    return tokensFromSearchParams
}

export const setBitrixTokensInLocalStorage = (tokens: TBitrixTokens) => {
    if (!tokens.AUTH_ID || !tokens.REFRESH_ID) {
        return
    }
    localStorage.setItem(LOCAL_STORAGE_BITRIX_TOKEN_KEY, JSON.stringify(tokens))
}

export const removeBitrixTokensFromLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_BITRIX_TOKEN_KEY)
}

export const bitrixTokensNotEmpty = () => {
    const tokens = getBitrixTokensFromLocalStorage()

    return (
        !!tokens &&
        'AUTH_ID' in tokens &&
        'REFRESH_ID' in tokens &&
        !!tokens.AUTH_ID &&
        !!tokens.REFRESH_ID
    )
}
