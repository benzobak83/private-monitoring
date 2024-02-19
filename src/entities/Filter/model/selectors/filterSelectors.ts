import { useStoreMap } from 'effector-react'
import { $filter } from '../filter'

export const useWorkOfObjectFilter = () =>
    useStoreMap($filter, (store) => store.workOfObject || {})
