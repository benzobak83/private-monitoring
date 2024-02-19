import { createEvent, createStore, sample } from 'effector'
import { clearEmptyFields } from '@shared/lib/helpers/clearEmptyFields'
import { cashingFilter } from '../lib/cashingFilter'
import { getCachedFilter } from '../lib/getCachedFilter'
import { FilterKeys, TFilter, TSetFilter } from './types/filter.types'

export const $filter = createStore<TFilter>(getCachedFilter())

export const resetFilter = createEvent<FilterKeys>()
export const setFilter = createEvent<TSetFilter>()

//сброс поля фильтра
sample({
    clock: resetFilter,
    source: $filter,
    fn: (store, filterName) => {
        const clonedStore = structuredClone(store)
        clonedStore[filterName] = {} as any
        return clonedStore
    },
    target: $filter,
})

//установка поля\полей фильтра
sample({
    clock: setFilter,
    source: $filter,
    fn: (store, { type, value }) => {
        const clonedStore = structuredClone(store)

        clonedStore[type] = clearEmptyFields(value, [], true) as any
        return clonedStore
    },
    target: $filter,
})

$filter.watch((filter) => {
    cashingFilter(filter)
})
