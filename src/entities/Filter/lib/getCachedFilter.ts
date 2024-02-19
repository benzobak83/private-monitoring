import { LOCAL_STORAGE_KEY_FILTER } from '@shared/lib/consts/localStorageKeys'
import { TFilter } from '../model/types/filter.types'
import { DEFAULT_FILTER_VALUES } from './consts'

export const getCachedFilter = (): TFilter => {
    return JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY_FILTER) ||
            JSON.stringify(DEFAULT_FILTER_VALUES)
    ) as TFilter
}
