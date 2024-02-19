import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $defectListTableData,
    getDefectListTableDataFx,
    resetDefectListTabledata,
} from '@entities/Defect'
import { $filter, FilterKeys } from '@entities/Filter'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const RepairTable: FC = () => {
    const getDefectListTableDataFxIsLoading = useStore(
        getDefectListTableDataFx.pending
    )
    const defectListTableData = useStore($defectListTableData)
    const repairReportFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.REPAIR_REPORT]
    )

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getDefectListTableDataFx({
            page,
            limit: rowsPerPage,
            filter: repairReportFilter,
        })
    }, [page, rowsPerPage, repairReportFilter])

    useEffect(() => {
        return () => resetDefectListTabledata()
    }, [])

    return (
        <>
            <MyStyledDataGrid
                rows={defectListTableData?.rows}
                columns={columns}
                loading={getDefectListTableDataFxIsLoading}
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={defectListTableData?.totalPageCount}
                rowsCount={defectListTableData?.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
