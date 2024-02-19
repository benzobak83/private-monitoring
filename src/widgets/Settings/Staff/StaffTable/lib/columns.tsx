import { GridColDef } from '@mui/x-data-grid'
import { useStaffStore } from '@entities/Settings/Staff'
import { TStaff } from '@entities/Settings/Staff'
import { CELL_ACTION_PARAMS } from '@shared/lib/consts/table'
import { TableActions } from '@shared/ui/TableComponents/TableActions/TableActions'

export const columns: GridColDef<TStaff, any, any>[] = [
    { field: 'name', headerName: 'Персонал', flex: 1 },
    { field: 'workPosition', headerName: 'Должность', flex: 1 },
    { field: 'subdivision', headerName: 'Подразделение', flex: 1 },
    {
        field: 'isAvailable',
        headerName: 'Доступ в приложение',
        flex: 1,
        renderCell: ({ row }) => {
            return row.isAvailable ? 'Да' : 'Нет'
        },
    },
    {
        field: 'lastAuthorization',
        headerName: 'Последняя авторизация',
        flex: 1,
    },

    {
        ...CELL_ACTION_PARAMS,
        renderCell: (params) => {
            return (
                <TableActions
                    editModalType={
                        params.row.isAvailable
                            ? 'createStaffModal'
                            : 'editStaffModal'
                    }
                    useStore={useStaffStore}
                    entity={params.row}
                />
            )
        },
    },
]
