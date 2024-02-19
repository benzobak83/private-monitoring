import { TSortStore } from '@/features/General/sortingTable'
import { TChecklistItems } from '@entities/Settings/ChecklistInspection'
import createFastContext from '@shared/lib/helpers/createFastContext'
import { sortChecklistInspectionItemsFx } from './sortItems'

export const {
    Provider: SortChecklistInspectionItemsTableProvider,
    useStore: useSortChecklistInspectionItemsTableStore,
} = createFastContext<TSortStore<TChecklistItems[]>>({
    rows: [],
    initRows: [],
    isStarting: false,
    isLoading: false,
    sortQuery: (sortedRows: number[], id: number) => {
        const data = {
            checklistItems: sortedRows,
        }
        return sortChecklistInspectionItemsFx({ data, id })
    },
})
