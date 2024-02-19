import { GridColDef } from '@mui/x-data-grid'
import { TDefectOfEqupmentListItem } from '@entities/Defect'
import { StatusCell } from '../ui/cells/StatusCell'

export const columns: GridColDef<TDefectOfEqupmentListItem, any, any>[] = [
    {
        field: 'createdAt',
        headerName: 'Выявлена',
        flex: 1,
    },
    {
        field: 'dateEnd',
        headerName: 'Устранена',
        flex: 1,
    },
    {
        field: '3',
        headerName: 'Статус',
        flex: 1,
        renderCell: ({ row }) => (
            <StatusCell method={row?.method?.name} status={row?.stage?.name} />
        ),
    },
]
