import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { IconButton, Stack } from '@mui/material'
import { FC } from 'react'
import { sortingRow } from '../lib/sortingRow'
import { TSort, TUseSortType } from '../model/types'

type SortTableRowControllersProps = {
    useSortStore: TUseSortType<(any & { id: number })[]>
    row: Record<string, any> & { id: number }
}

export const SortTableRowControllers: FC<SortTableRowControllersProps> = ({
    useSortStore,
    row,
}) => {
    const [{ rows }, setSortStore] = useSortStore((store) => store)

    const handleSort = (type: TSort) => () => {
        const result = sortingRow(row, rows, type)
        if (!result) return
        setSortStore({ rows: result, isStarting: true })
    }

    return (
        <Stack direction="row">
            <IconButton onClick={handleSort('up')}>
                <ArrowUpwardIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleSort('down')}>
                <ArrowDownwardIcon color="warning" />
            </IconButton>
        </Stack>
    )
}
