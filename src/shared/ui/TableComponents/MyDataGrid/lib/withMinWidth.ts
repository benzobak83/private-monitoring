import { GridColDef } from '@mui/x-data-grid'

const MIN_WIDTH = 120

export const withMinWidth = (columns: GridColDef<any, any, any>[]) => {
    return columns.map((column) =>
        'minWidth' in column ? column : { ...column, minWidth: MIN_WIDTH }
    )
}
