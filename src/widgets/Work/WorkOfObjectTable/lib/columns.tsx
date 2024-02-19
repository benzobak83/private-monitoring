import { GridColDef } from '@mui/x-data-grid'
import { TWorkOfObject } from '@entities/Work/model/types'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'
import { DeadlineCell } from '../ui/DeadlineCell'

export const columns: GridColDef<TWorkOfObject, any, any>[] = [
    {
        field: 'dateStart',
        headerName: 'Начало',
        flex: 1,
    },
    {
        field: 'dateEnd',
        headerName: 'Окончание',
        flex: 1,
        renderCell: ({ row }) => <DeadlineCell row={row} />,
    },
    {
        field: 'duration',
        headerName: 'Продолжительность',
        flex: 1,
    },
    {
        field: '4',
        headerName: 'Сотрудник',
        flex: 1,
        renderCell: getCellValueFromRow('user.name'),
    },
    {
        field: 'inspectionObject',
        headerName: 'Проведенных осмотров объекта',
        flex: 1,
    },
    {
        field: 'inspectionEquipment',
        headerName: 'Проведенных осмотров оборудования',
        flex: 1,
    },
    {
        field: 'maintenanceEquipment',
        headerName: 'Проведенных регламентных работ',
        flex: 1,
    },
]
