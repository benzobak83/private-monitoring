import { TSortStore } from '@/features/General/sortingTable'
import { TChecklistItems } from '@entities/Settings/ChecklistWork'
import createFastContext from '@shared/lib/helpers/createFastContext'
import { sortChecklistWorkItemsFx } from './sortItems'

export const {
    Provider: SortChecklistWorkItemsTableProvider,
    useStore: useSortChecklistWorkItemsTableStore,
} = createFastContext<TSortStore<TChecklistItems[]>>({
    rows: [],
    initRows: [],
    isLoading: false,
    isStarting: false,
    sortQuery: (sortedRows: number[], id: number) => {
        const data = {
            checklistItems: sortedRows,
        }
        return sortChecklistWorkItemsFx({ data, id })
    },
})
