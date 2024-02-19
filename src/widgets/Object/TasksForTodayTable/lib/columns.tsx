import { GridColDef } from '@mui/x-data-grid'
import { TypeChecklistCell } from '@entities/Settings/Checklist'
import { TTaskListItem } from '@entities/Task'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { ActionCell } from '../ui/cells/ActionCell'
import { ObjectOrEquipmentCell } from '../ui/cells/ObjectOrEquipmentCell'

export const columns: GridColDef<TTaskListItem, any, any>[] = [
    {
        field: 'typeChecklist',
        headerName: 'Тип',
        flex: 1,
        renderCell: ({ row }) => (
            <TypeChecklistCell typeChecklist={row.typeChecklist} />
        ),
    },
    {
        field: 'device',
        headerName: 'Оборудование',
        flex: 1,
        renderCell: ({ row }) => (
            <ObjectOrEquipmentCell equipment={row.equipment} />
        ),
    },
    {
        field: 'name',
        headerName: 'Чек-лист',
        flex: 1,
    },
    {
        field: 'regularity',
        headerName: 'Регулярность',
        flex: 1,
    },
    {
        field: 'user',
        headerName: 'Назначен',
        flex: 1,
        renderCell: getCellValueFromRow('user.name'),
    },
    {
        field: '6',
        headerName: '',
        renderCell: ({ row }) => {
            return (
                <ActionCell
                    typeChecklist={row.typeChecklist?.id}
                    state={row.state?.id}
                    checkId={row.id}
                    checklistId={row.checklist?.id}
                    dateChecked={row.dateChecked}
                />
            )
        },
        flex: 1,
    },
]
