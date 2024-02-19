import { GridColDef } from '@mui/x-data-grid'
import {
    TSubdivision,
    useSubdivisionStore,
} from '@entities/Settings/Subdivision'
import { CELL_ACTION_PARAMS, CELL_USER_PARAMS } from '@shared/lib/consts/table'
import { TableActions } from '@shared/ui/TableComponents/TableActions/TableActions'

export const columns: GridColDef<TSubdivision, any, any>[] = [
    { field: 'name', headerName: 'Название', flex: 1 },
    { ...CELL_USER_PARAMS, headerName: 'Начальник', flex: 1 },
    {
        ...CELL_ACTION_PARAMS,
        renderCell: (params) => {
            return (
                <TableActions
                    editModalType="editSubdivisionModal"
                    useStore={useSubdivisionStore}
                    entity={params.row}
                />
            )
        },
    },
]
