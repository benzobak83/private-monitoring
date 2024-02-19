import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { useWorkOfObjectFilter } from '@entities/Filter'
import {
    $workListOfObjectTableData,
    $workListOfObjectTableDataIsReloaded,
    getWorkListOfObjectTableDataFx,
} from '@entities/Work/model/getWorkOfObjectList'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const WorkOfObjectTable: FC = () => {
    const workOfObjectData = useStore($workListOfObjectTableData)
    const getWorkListOfObjectTableDataFxIsLoading = useStore(
        getWorkListOfObjectTableDataFx.pending
    )
    const workListOfObjectTableDataIsReloaded = useStore(
        $workListOfObjectTableDataIsReloaded
    )
    const workOfObjectFilter = useWorkOfObjectFilter()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    const { id } = useDefaultParams()

    useEffect(() => {
        getWorkListOfObjectTableDataFx({
            data: { page, limit: rowsPerPage, filter: workOfObjectFilter },
            id,
        })
    }, [
        workOfObjectFilter,
        id,
        page,
        rowsPerPage,
        workListOfObjectTableDataIsReloaded,
    ])
    return (
        <>
            <MyStyledDataGrid
                rows={workOfObjectData.rows || []}
                columns={columns}
                height="62vh"
                loading={getWorkListOfObjectTableDataFxIsLoading}
            />

            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={workOfObjectData.totalPageCount}
                rowsCount={workOfObjectData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
