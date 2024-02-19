import { GridColDef } from '@mui/x-data-grid'
import { THistoryOfRegulatoryWorkCheckForEquipmentListItem } from '@entities/Check'
import { UserCell } from '@entities/User'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { CompleteWorkCheckForEquipmentCell } from '../ui/CompleteWorkCheckForEquipmentCell'

export const columns: GridColDef<
    THistoryOfRegulatoryWorkCheckForEquipmentListItem,
    any,
    any
>[] = [
    {
        field: 'state',
        headerName: 'Выполнен',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => (
            <CompleteWorkCheckForEquipmentCell row={row} />
        ),
    },
    {
        field: 'user',
        headerName: 'Пользователь',
        flex: 1,
        renderCell: ({ row }) => (
            <UserCell
                emptyText="не назначен"
                warningAboutEmpty
                user={row.user}
            />
        ),
    },
    {
        field: 'checklist',
        headerName: 'Работы (чеклист)',
        flex: 1,
        renderCell: getCellValueFromRow('checklist.name'),
    },
]
