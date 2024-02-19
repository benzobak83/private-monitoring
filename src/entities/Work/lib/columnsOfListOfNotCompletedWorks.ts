import { GridColDef } from '@mui/x-data-grid'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'

export const columnsOfListOfNotCompletedWorks: GridColDef<any, any, any>[] = [
    {
        field: '1',
        headerName: 'Тип',
        flex: 1,
        renderCell: getCellValueFromRow('checklistType.name'),
    },
    {
        field: 'checklistName',
        headerName: 'Чеклист',
        flex: 1,
    },
]
