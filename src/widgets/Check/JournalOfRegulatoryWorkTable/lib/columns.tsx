import { GridColDef } from '@mui/x-data-grid'
import { StateOfCheckCell } from '@entities/Check'
import { TJournalOfInspectionCheckListItem } from '@entities/Check/model/types/journalOfInspectionCheck'
import { EquipmentCell } from '@entities/Equipment'
import { ObjectCell } from '@entities/Object'
import { InspectionChecklistCell } from '@entities/Settings/ChecklistInspection'
import { UserCell } from '@entities/User'

export const columns: GridColDef<
    TJournalOfInspectionCheckListItem,
    any,
    any
>[] = [
    {
        field: 'lastCheck',
        headerName: 'Дата проведения',
        flex: 1,
    },
    {
        field: 'checklist',
        headerName: 'Чек-лист',
        flex: 1,
        renderCell: ({ row }) => (
            <InspectionChecklistCell checklist={row.checklist} />
        ),
    },
    {
        field: 'subdivision',
        headerName: 'Сотрудник',
        flex: 1,
        renderCell: ({ row }) => <UserCell user={row.user} />,
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
        field: '3',
        headerName: 'Статус',
        flex: 1,
        renderCell: ({ row }) => <StateOfCheckCell state={row.state} />,
    },
]
