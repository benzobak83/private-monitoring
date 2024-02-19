import { GridColDef } from '@mui/x-data-grid'
import { TOfficial } from '@entities/Settings/Officials'
import { EmployeeSelect } from '../ui/EmployeeSelect/EmployeeSelect'

export const columns: GridColDef<TOfficial, any, any>[] = [
    {
        field: 'name',
        headerName: 'Должность',
        width: 300,
    },
    {
        field: 'users',
        headerName: 'Сотрудник',
        width: 400,

        renderCell: ({ row }) => {
            return <EmployeeSelect official={row} />
        },
    },
]
