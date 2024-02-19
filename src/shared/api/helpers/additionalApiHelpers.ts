import secureLocalStorage from 'react-secure-storage'
import { LOCAL_STORAGE_ADDITIONAL_TOKEN_KEY } from '../../lib/consts/localStorageKeys'

export const getAdditionalToken = () => {
    return secureLocalStorage.getItem(LOCAL_STORAGE_ADDITIONAL_TOKEN_KEY)
}

export const setAdditionalToken = (token: string) => {
    secureLocalStorage.setItem(LOCAL_STORAGE_ADDITIONAL_TOKEN_KEY, token)
}

export const removeAdditionalToken = () => {
    secureLocalStorage.removeItem(LOCAL_STORAGE_ADDITIONAL_TOKEN_KEY)
}

export const additionalTokenNotEmpty = () =>
    typeof getAdditionalToken() === 'string' && !!getAdditionalToken()
