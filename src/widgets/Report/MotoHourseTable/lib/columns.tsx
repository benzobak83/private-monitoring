import { GridColDef } from '@mui/x-data-grid'
import { TJournalOfInspectionCheckListItem } from '@entities/Check'
import { EquipmentCell } from '@entities/Equipment'
import { ObjectCell } from '@entities/Object'
import { UserCell } from '@entities/User'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'

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
        field: 'subdivision',
        headerName: 'Подразделение',
        flex: 1,
        renderCell: getCellValueFromRow('subdivision.name'),
    },
    {
        field: 'object',
        headerName: 'Объект',
        flex: 1,
        renderCell: ({ row }) => <ObjectCell object={row.object} />,
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
