import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $journalOfOperatingTimeTableData,
    getJournalOfOperatingTimeTableDataFx,
    resetJournalOfOperatingTimeTableData,
} from '@entities/Equipment'
import { $filter, FilterKeys } from '@entities/Filter'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { useInit } from '@shared/lib/hooks/useInit'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const JournalOfOperatingTimeTable: FC = () => {
    const journalOfOperatingTimeTableData = useStore(
        $journalOfOperatingTimeTableData
    )
    const getJournalOfOperatingTimeTableDataFxIsLoading = useStore(
        getJournalOfOperatingTimeTableDataFx.pending
    )
    const journalOfInspectionCheckFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_OPERATING_TIME] || {}
    )

    const { init } = useInit()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getJournalOfOperatingTimeTableDataFx({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: journalOfInspectionCheckFilter,
        })
    }, [rowsPerPage, page, journalOfInspectionCheckFilter])

    useEffect(() => {
        return () => resetJournalOfOperatingTimeTableData()
    }, [])

    if (init && getJournalOfOperatingTimeTableDataFxIsLoading) {
        return <Loader heightValue={150} />
    }
    return (
        <>
            <MyStyledDataGrid
                rows={journalOfOperatingTimeTableData?.rows}
                columns={columns}
                loading={getJournalOfOperatingTimeTableDataFxIsLoading}
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={journalOfOperatingTimeTableData?.totalPageCount}
                rowsCount={journalOfOperatingTimeTableData?.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
