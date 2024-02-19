import { GridColDef } from '@mui/x-data-grid'
import { TJournalOfInspectionCheckListItem } from '@entities/Check'
import { EquipmentCell } from '@entities/Equipment'
import { UserCell } from '@entities/User'

export const columns: GridColDef<
    TJournalOfInspectionCheckListItem,
    any,
    any
>[] = [
    {
        field: 'createdAt',
        headerName: 'Дата проведения',
        flex: 1,
    },

    {
        field: 'subdivision',
        headerName: 'Сотрудник',
        flex: 1,
        renderCell: ({ row }) => <UserCell user={row.user} />,
    },

    {
        field: 'equipment',
        headerName: 'Оборудование',
        flex: 1,
        renderCell: ({ row }) => <EquipmentCell equipment={row.equipment} />,
    },
    {
        field: 'value',
        headerName: 'Кол-во часов за смену',
        flex: 1,
    },
    {
        field: 'sum',
        headerName: 'Нарастающее показание',
        flex: 1,
    },
]
