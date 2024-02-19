import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { StartWorkCell } from '@/features/Work/startWork'
import { TWork } from '@entities/Work'
import { ROUTES } from '@shared/lib/consts/routes'
import { ValueOrFallback } from '@shared/ui/ValueOrFallback/ValueOrFallback'

export const columns: GridColDef<TWork, any, any>[] = [
    {
        field: 'dateStart',
        headerName: 'Начало смены',
        flex: 1,
    },
    {
        field: 'dateEnd',
        headerName: 'Окончание смены',
        flex: 1,
        renderCell: ({ row }) => (
            <ValueOrFallback value={row.dateEnd} fallback={'-'} />
        ),
    },
    {
        field: 'duration',
        headerName: 'Продолжительность',
        flex: 1,
    },
    {
        field: 'object',
        headerName: 'Объект',
        flex: 1,
        renderCell: ({ row }) => (
            <Link to={ROUTES.object.cardGet(row.object.id)}>
                {row?.object?.name} (
                {row.isWorkInProgress ? 'В работе' : 'Свободен'})
            </Link>
        ),
    },
    {
        field: 'actions',
        headerName: 'Действия',
        flex: 1,
        renderCell: ({ row }) => <StartWorkCell work={row} btnText="Начать" />,
    },
]
