import { GridColDef } from '@mui/x-data-grid'
import { TDefectItemOfList } from '@entities/Defect'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { DatesCell } from '../ui/cells/DatesCell'
import { ExpensesCell } from '../ui/cells/ExpensesCell'

export const columns: GridColDef<TDefectItemOfList, any, any>[] = [
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
        headerName: 'Оборудование',
        flex: 1,
        renderCell: getCellValueFromRow('equipment.name'),
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
