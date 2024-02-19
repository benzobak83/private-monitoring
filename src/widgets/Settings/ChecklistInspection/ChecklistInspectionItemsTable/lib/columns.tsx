import { GridColDef } from '@mui/x-data-grid'
import { SortTableRowControllers } from '@/features/General/sortingTable'
import { useSortChecklistInspectionItemsTableStore } from '@/features/Settings/ChecklistInspection/sortItems/model/SortChecklistInspectionItemsTableProvider'
import {
    TChecklistItems,
    useChecklistInspectionItemStore,
} from '@entities/Settings/ChecklistInspection'
import { CELL_ACTION_PARAMS } from '@shared/lib/consts/table'
import { TableActions } from '@shared/ui/TableComponents/TableActions/TableActions'
import { ChecklistOptions } from '../ui/ChecklistOptions'

export const columns: GridColDef<TChecklistItems, any, any>[] = [
    {
        field: 'sort',
        headerName: 'Порядок',
        width: 100,
        renderCell: ({ row }) => {
            return (
                <SortTableRowControllers
                    row={row}
                    useSortStore={useSortChecklistInspectionItemsTableStore}
                />
            )
        },
    },
    { field: 'name', headerName: 'Название', width: 200 },
    {
        field: 'options',
        headerName: 'Варианты ответов',
        width: 210,
        renderCell: ({ row }) => {
            return <ChecklistOptions options={row.answerOptions} />
        },
    },

    {
        ...CELL_ACTION_PARAMS,
        renderCell: (params) => {
            return (
                <TableActions
                    deleteModalType="deleteChecklistItemModal"
                    editModalType="editChecklistItemModal"
                    useStore={useChecklistInspectionItemStore}
                    entity={params.row}
                />
            )
        },
    },
]
