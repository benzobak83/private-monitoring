import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { DefectTypeChip } from '@entities/Defect'
import { TDefectItemOfList } from '@entities/Defect/model/types/types'
import { ROUTES } from '@shared/lib/consts/routes'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { DatesCell } from '../ui/cells/DatesCell'
import { ExpensesCell } from '../ui/cells/ExpensesCell'

export const columns: GridColDef<TDefectItemOfList, any, any>[] = [
    {
        field: 'id',
        headerName: '№',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => (
            <Link to={ROUTES.defect.cardGet(row.id)}>{row.id}</Link>
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Выявлено',
        flex: 1,
    },
    {
        field: 'subdivision',
        headerName: 'Подразделение',
        flex: 1,
        renderCell: getCellValueFromRow('subdivision.name'),
    },
    {
        field: '15',
        headerName: 'Объект',
        flex: 1,
        renderCell: getCellValueFromRow('object.name'),
    },
    {
        field: '2',
        headerName: 'Оборудование / помещение',
        flex: 1,
        renderCell: getCellValueFromRow('equipment.name'),
    },
    {
        field: '3',
        headerName: 'Статус',
        flex: 1,
        renderCell: getCellValueFromRow('stage.name'),
    },
    {
        field: '4',
        headerName: 'Тип неиспр-ти',
        width: 150,

        renderCell: ({ row }) => (
            <DefectTypeChip label={row?.result?.name} type={row?.result?.id} />
        ),
    },

    {
        field: 'priority',
        headerName: 'Приоритет',
        flex: 1,
    },
    {
        field: 'method',
        headerName: 'Метод устранения',
        flex: 1,
        renderCell: getCellValueFromRow('method.name'),
    },
    {
        field: 'client',
        headerName: 'Подрядчик',
        flex: 1,
        renderCell: getCellValueFromRow('client.name'),
    },
    {
        field: 'planDate',
        headerName: 'План начало / окончание',
        flex: 1,
        minWidth: 170,
        renderCell: ({ row }) => <DatesCell dates={row.planDate} />,
    },
    {
        field: 'executionDate',
        headerName: 'Факт начало / окончание',
        flex: 1,
        minWidth: 170,
        renderCell: ({ row }) => <DatesCell dates={row.executionDate} />,
    },
    {
        field: 'sum',
        headerName: 'Затраты, руб.',
        flex: 1,
        renderCell: ({ row }) => <ExpensesCell expenses={row.sum} />,
    },
]
