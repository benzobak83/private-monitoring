import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $tasksForTodayTableData,
    $tasksForTodayTableDataNeedReload,
    getTasksForTodayTableDataFx,
} from '@entities/Task'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const TasksForTodayTable: FC = () => {
    const tasksForTodayTableData = useStore($tasksForTodayTableData)
    const getTasksForTodayTableDataFxIsLoading = useStore(
        getTasksForTodayTableDataFx.pending
    )
    const tasksForTodayTableDataNeedReload = useStore(
        $tasksForTodayTableDataNeedReload
    )

    const { id } = useDefaultParams()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getTasksForTodayTableDataFx({ id, data: { page, limit: rowsPerPage } })
    }, [id, page, rowsPerPage, tasksForTodayTableDataNeedReload])

    return (
        <>
            <MyStyledDataGrid
                rows={tasksForTodayTableData.rows}
                columns={columns}
                loading={getTasksForTodayTableDataFxIsLoading}
                height="70.4vh"
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={tasksForTodayTableData.totalPageCount}
                rowsCount={tasksForTodayTableData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
