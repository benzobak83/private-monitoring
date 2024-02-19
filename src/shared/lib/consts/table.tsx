import { Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export const CELL_ACTION_PARAMS: GridColDef<any, any, any> = {
    field: 'actions',
    headerName: 'Действия',
    width: 110,
    headerAlign: 'center',
    align: 'center',
}

export const CELL_USER_PARAMS: GridColDef<any, any, any> = {
    field: 'user',
    renderCell: ({ row }) => {
        return <Typography>{row?.user?.name}</Typography>
    },
}

export const ID_PARAMS = {
    width: 80,
}

export const WITHOUT_CELL_ACTIONS = {
    sortable: false,
    filterable: false,
    hideable: false,
}
