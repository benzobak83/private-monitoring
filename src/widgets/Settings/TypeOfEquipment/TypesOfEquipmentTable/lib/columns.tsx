import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { ID_PARAMS } from '@shared/lib/consts/table'

export const columns: GridColDef<any, any, any>[] = [
    {
        field: 'id',
        headerName: 'Номер',
        ...ID_PARAMS,
        renderCell: ({ row }) => {
            return <Link to={'edit/' + String(row.id)}>{row.id}</Link>
        },
    },
    {
        field: 'name',
        headerName: 'Название',
        flex: 1,
        renderCell: ({ row }) => {
            return <Link to={'edit/' + String(row.id)}>{row.name}</Link>
        },
    },
    { field: 'checklistInspection', headerName: 'Проверки состояния', flex: 1 },
    {
        field: 'checklistMaintenance',
        headerName: 'Регламентные работы',
        flex: 1,
    },
]
