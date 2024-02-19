import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import {
    TChecklistWork,
    useChecklistWorkStore,
} from '@entities/Settings/ChecklistWork'
import {
    CELL_ACTION_PARAMS,
    ID_PARAMS,
    WITHOUT_CELL_ACTIONS,
} from '@shared/lib/consts/table'
import { TableActions } from '@shared/ui/TableComponents/TableActions/TableActions'

export const columns: GridColDef<TChecklistWork, any, any>[] = [
    {
        field: 'id',
        headerName: 'Номер',
        ...WITHOUT_CELL_ACTIONS,
        ...ID_PARAMS,
        renderCell: ({ row }) => {
            return <Link to={String(row.id)}>{row.id}</Link>
        },
    },
    {
        field: 'name',
        headerName: 'Название',
        ...WITHOUT_CELL_ACTIONS,
        width: 200,
        renderCell: ({ row }) => {
            return <Link to={String(row.id)}>{row.name}</Link>
        },
    },

    {
        field: 'equipmentCount',
        headerName: 'Использовано в типах оборудования',
        ...WITHOUT_CELL_ACTIONS,
        width: 250,
    },
    {
        field: 'checklistItemCount',
        headerName: 'Пунктов в чеклисте',
        ...WITHOUT_CELL_ACTIONS,
        width: 135,
    },
    {
        ...CELL_ACTION_PARAMS,
        ...WITHOUT_CELL_ACTIONS,
        renderCell: (params) => {
            return (
                <TableActions
                    deleteModalType="deleteChecklistWorkModal"
                    useStore={useChecklistWorkStore}
                    entity={params.row}
                />
            )
        },
    },
]
