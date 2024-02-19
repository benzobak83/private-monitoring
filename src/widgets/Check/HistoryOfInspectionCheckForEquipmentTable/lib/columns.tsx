import { GridColDef } from '@mui/x-data-grid'
import {
    ResultOfCheckWIthStatusName,
    THistoryOfInspectionCheckForEquipmentListItem,
} from '@entities/Check'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { CompleteInspectionCheckForEquipmentCell } from '../ui/CompleteInspectionCheckForEquipmentCell'

export const columns: GridColDef<
    THistoryOfInspectionCheckForEquipmentListItem,
    any,
    any
>[] = [
    {
        field: '2',
        headerName: 'Выполнен',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => {
            return <CompleteInspectionCheckForEquipmentCell row={row} />
        },
    },
    {
        field: '3',
        headerName: 'Пользователь',
        flex: 1,
        renderCell: getCellValueFromRow('user.name'),
    },
    {
        field: '4',
        headerName: 'Результат',
        flex: 1,
        renderCell: ({ row }) => (
            <ResultOfCheckWIthStatusName result={row.result} />
        ),
    },
]
