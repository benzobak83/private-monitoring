import { LOCAL_STORAGE_KEY_FILTER } from '@shared/lib/consts/localStorageKeys'

export const cashingFilter = (filter: Record<string, any>) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FILTER, JSON.stringify(filter))
}
