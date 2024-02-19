import { TLocalStorageKey } from '../consts/localStorageKeys'

type GetValueFromLocalStorageByKeyWithPathReturnValue = {
    page: number
    limit: number
}

export function getValueFromLocalStorageByKeyWithPath(
    key: TLocalStorageKey
): GetValueFromLocalStorageByKeyWithPathReturnValue {
    const pathname = window.location.pathname

    return JSON.parse(
        localStorage.getItem(key + pathname) || '{}'
    ) as GetValueFromLocalStorageByKeyWithPathReturnValue
}
