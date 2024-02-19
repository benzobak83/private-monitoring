import { GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { ResultOfCheck } from '@entities/Check'
import { TEquipmentListItem } from '@entities/Equipment/model/types/types'
import { ROUTES } from '@shared/lib/consts/routes'
import { getCellValueFromRow } from '@shared/lib/helpers/getCellValueFromRow'

export const columns: GridColDef<TEquipmentListItem, any, any>[] = [
    {
        field: 'name',
        headerName: 'Название',
        flex: 1,
        renderCell: ({ row }) => {
            return <Link to={ROUTES.equipment.cardGet(row.id)}>{row.name}</Link>
        },
    },
    {
        field: 'fixedAsset',
        headerName: 'Основное средство',
        flex: 1,
        renderCell: getCellValueFromRow('fixedAsset.name'),
    },
    {
        field: 'technicalNumber',
        headerName: 'Код',
        flex: 1,
    },
    {
        field: 'inventoryNumber',
        headerName: 'Инвент. ном.',
        flex: 1,
    },
    {
        field: 'object',
        headerName: 'Объект',
        flex: 1,
        renderCell: getCellValueFromRow('object.name'),
    },
    {
        field: 'user',
        headerName: 'Мол',
        flex: 1,
        renderCell: getCellValueFromRow('user.name'),
    },
    {
        field: 'result',
        headerName: 'Результат проверки',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: ({ row }) => (
            <>{row.result ? <ResultOfCheck typeResult={row.result} /> : '-'}</>
        ),
    },
]
