import { GridColDef } from '@mui/x-data-grid'
import { UserCell } from '@entities/User'

export const columns: GridColDef<any, any, any>[] = [
    {
        field: 'createdAt',
        headerName: 'Дата и время',
        flex: 1,
    },
    {
        field: 'user',
        headerName: 'Пользователь',
        flex: 1,
        renderCell: ({ row }) => <UserCell user={row.user} />,
    },
    {
        field: 'value',
        headerName: 'Наработка',
        flex: 1,
    },
    {
        field: 'sum',
        headerName: 'Нарастающее',
        flex: 1,
    },
]
