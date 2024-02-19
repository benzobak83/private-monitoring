import { GridColDef } from '@mui/x-data-grid'
import { TMaterialItemOfList } from '@entities/Material'

export const columns: GridColDef<TMaterialItemOfList, any, any>[] = [
    {
        field: 'name',
        headerName: 'Материалы',
        flex: 1,
    },
    {
        field: 'balance',
        headerName: 'Кол-во',
        flex: 1,
    },
    {
        field: 'cost',
        headerName: 'Стоимость',
        flex: 1,
    },
]
