import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { ResultOfCheck, StatisticsResultsOfCheck } from '@entities/Check'
import { TObjectListItem } from '@entities/Object/model/types'
import { ROUTES } from '@shared/lib/consts/routes'
import { ID_PARAMS } from '@shared/lib/consts/table'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'

export const columns: GridColDef<TObjectListItem, any, any>[] = [
    {
        field: 'id',
        headerName: '№',
        ...ID_PARAMS,
        renderCell: ({ row }) => {
            return typeof row.id === 'number' ? (
                <Link to={ROUTES.object.cardGet(row.id)}>{row.id}</Link>
            ) : (
                row.id
            )
        },
    },
    {
        field: 'subdivision',
        headerName: 'Подразделение',
        flex: 1,
        renderCell: getCellValueFromRow('subdivision.name'),
    },
    {
        field: 'name',
        headerName: 'Объект',
        flex: 1,
        renderCell: ({ row }) => {
            return <Link to={ROUTES.object.cardGet(row.id)}>{row.name}</Link>
        },
    },
    {
        field: 'objectCheck',
        headerName: 'Результат проверки',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => <ResultOfCheck typeResult={row.objectCheck} />,
    },
    {
        field: 'equipmentCheck',
        headerName: 'Оборудование',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) =>
            !!row.equipmentCheck?.all ? (
                <StatisticsResultsOfCheck results={row.equipmentCheck} />
            ) : (
                '-'
            ),
    },
    {
        field: 'responsible',
        headerName: 'Ответственный',
        flex: 1,
        renderCell: getCellValueFromRow('user.name'),
    },
    { field: 'address', headerName: 'Адрес', flex: 1 },
]
