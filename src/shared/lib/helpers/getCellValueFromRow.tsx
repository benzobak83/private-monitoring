import { Typography } from '@mui/material'
import objectPath from 'object-path'

export const getCellValueFromRow = (path: string, noData = '-') => {
    return ({ row }: Record<string, any>) => (
        <Typography>{objectPath.get(row, path) || noData}</Typography>
    )
}
