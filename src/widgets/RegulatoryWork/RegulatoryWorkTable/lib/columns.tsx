import { GridColDef } from '@mui/x-data-grid'
import { StartRegulatoryWorkBtn } from '@/features/RegulatoryWork/startRegulatoryWork/ui/StartRegulatoryWorkBtn'
import { TRegulatoryWorkListItem } from '@entities/RegulatoryWork'
import { MasterCell } from '../ui/MasterCell'

export const columns: GridColDef<TRegulatoryWorkListItem, any, any>[] = [
    { field: '1', headerName: 'Подразделение', flex: 1 },
    {
        field: '2',
        headerName: 'Объект',
        flex: 1,
    },
    {
        field: '3',
        headerName: 'Оборудование',
        flex: 1,
        align: 'center',
    },
    {
        field: '4',
        headerName: 'Чеклист',
        flex: 1,
    },
    {
        field: '5',
        headerName: 'Мастер',
        flex: 1,
        renderCell: ({ row }) => <MasterCell regulatoryWork={row} />,
    },
    { field: '6', headerName: 'План по дате', flex: 1 },
    { field: '7', headerName: 'План по пробегу', flex: 1 },
    {
        field: '8',
        headerName: 'Работы начаты',
        flex: 1,
        renderCell: ({ row }) => (
            <StartRegulatoryWorkBtn regulatoryWork={row} />
        ),
    },
    { field: '9', headerName: 'Работы закончены', flex: 1 },
]
