import { GridColDef } from '@mui/x-data-grid'
import { ChecklistWorkCell } from '@entities/Settings/ChecklistWork'

export const columns: GridColDef<any, any, any>[] = [
    {
        field: 'name',
        headerName: 'Чеклист',
        flex: 1,
        renderCell: ({ row }) => <ChecklistWorkCell checklist={row} />,
    },
    {
        field: 'description',
        headerName: 'Регулярность',
        flex: 1,
    },
]
