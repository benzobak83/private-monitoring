import {
    additionalTokenNotEmpty,
    getAdditionalToken,
} from './helpers/additionalApiHelpers'
import {
    getBitrixTokensFromLocalStorage,
    bitrixTokensNotEmpty,
    getBitrixTokensFromSearchQuery,
    setBitrixTokensInLocalStorage,
} from './helpers/bitrixApiHelpers'
import {
    configureApi,
    setAdditionalApiHeaders,
    setBitrixApiHeaders,
} from './helpers/configureApi'
import { pingToken } from './model/tokenIsChanged'
import { TBitrixTokens } from './types'

const bitrixTokensFromSearchParams = getBitrixTokensFromSearchQuery()
// const bitrixTokensFromLocalStorage = getBitrixTokensFromLocalStorage()

if (bitrixTokensFromSearchParams) {
    setBitrixTokensInLocalStorage(bitrixTokensFromSearchParams as TBitrixTokens)
}

export const initApi = () => {
    const tokens = getBitrixTokensFromLocalStorage()
    const additionalToken = getAdditionalToken()

    if (additionalTokenNotEmpty() && typeof additionalToken === 'string') {
        return configureApi({ type: 'additional', token: additionalToken })
    }

    return configureApi({ type: 'bitrix', token: tokens })
}

const api = initApi()

pingToken.watch(() => {
    const tokens = getBitrixTokensFromLocalStorage()
    const additionalToken = getAdditionalToken()

    if (additionalTokenNotEmpty() && typeof additionalToken === 'string') {
        setAdditionalApiHeaders(api, additionalToken)
        return
    }
    if (bitrixTokensNotEmpty()) {
        setBitrixApiHeaders(api, tokens)
    }
})

export default api
