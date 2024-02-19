import { GridColDef } from '@mui/x-data-grid'
import { SortTableRowControllers } from '@/features/General/sortingTable'
import { useSortChecklistWorkItemsTableStore } from '@/features/Settings/ChecklistWork/sortItems'
import { TChecklistItems } from '@entities/Settings/ChecklistInspection'
import { useChecklistWorkItemStore } from '@entities/Settings/ChecklistWork'
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
                    useSortStore={useSortChecklistWorkItemsTableStore}
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
                    useStore={useChecklistWorkItemStore}
                    entity={params.row}
                />
            )
        },
    },
]
