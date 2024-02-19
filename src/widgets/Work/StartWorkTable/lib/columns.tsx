import { GridColDef } from '@mui/x-data-grid'
import { StartWorkCell } from '@/features/Work/startWork'
import { TWorkStartListItem } from '@entities/Work'

export const columns: GridColDef<TWorkStartListItem, any, any>[] = [
    {
        field: '1',
        headerName: 'Объект',
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <StartWorkCell
                    work={{
                        ...row?.works,
                        object: { name: row.name, id: row.id },
                    }}
                    btnText={row.name}
                    withIcon
                />
            )
        },
    },
]
