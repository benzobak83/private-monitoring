import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $journalOfInspectionCheckTableData,
    getJournalOfInspectionCheckTableDataFx,
    resetJournalOfInspectionCheckTableData,
} from '@entities/Check/model'
import { $filter, FilterKeys } from '@entities/Filter'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { useInit } from '@shared/lib/hooks/useInit'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const JournalOfInspectionCheckTable: FC = () => {
    const journalOfInspectionCheckTableData = useStore(
        $journalOfInspectionCheckTableData
    )
    const getJournalOfInspectionCheckTableDataFxIsLoading = useStore(
        getJournalOfInspectionCheckTableDataFx.pending
    )
    const journalOfInspectionCheckFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_INSPECTION_CHECK] || {}
    )

    const { init } = useInit()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getJournalOfInspectionCheckTableDataFx({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: journalOfInspectionCheckFilter,
        })
    }, [rowsPerPage, page, journalOfInspectionCheckFilter])

    useEffect(() => {
        return () => resetJournalOfInspectionCheckTableData()
    }, [])

    if (init && getJournalOfInspectionCheckTableDataFxIsLoading) {
        return <Loader heightValue={150} />
    }
    return (
        <>
            <MyStyledDataGrid
                rows={journalOfInspectionCheckTableData?.rows}
                columns={columns}
                loading={getJournalOfInspectionCheckTableDataFxIsLoading}
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={journalOfInspectionCheckTableData?.totalPageCount}
                rowsCount={journalOfInspectionCheckTableData?.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
