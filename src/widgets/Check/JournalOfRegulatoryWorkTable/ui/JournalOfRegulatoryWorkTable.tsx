import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $journalOfRegulatoryWorkTableData,
    getJournalOfRegulatoryWorkTableDataFx,
    resetJournalOfRegulatoryWorkTableData,
} from '@entities/Check/model'
import { $filter, FilterKeys } from '@entities/Filter'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { useInit } from '@shared/lib/hooks/useInit'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { Loader } from '@shared/ui/Loaders/Loader/Loader'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

export const JournalOfRegulatoryWorkTable: FC = () => {
    const journalOfRegulatoryWorkTableData = useStore(
        $journalOfRegulatoryWorkTableData
    )
    const getJournalOfRegulatoryWorkTableDataFxIsLoading = useStore(
        getJournalOfRegulatoryWorkTableDataFx.pending
    )
    const journalOfInspectionCheckFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_INSPECTION_CHECK] || {}
    )

    const { init } = useInit()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getJournalOfRegulatoryWorkTableDataFx({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: journalOfInspectionCheckFilter,
        })
    }, [rowsPerPage, page, journalOfInspectionCheckFilter])

    useEffect(() => {
        return () => resetJournalOfRegulatoryWorkTableData()
    }, [])

    if (init && getJournalOfRegulatoryWorkTableDataFxIsLoading) {
        return <Loader heightValue={150} />
    }
    return (
        <>
            <MyStyledDataGrid
                rows={journalOfRegulatoryWorkTableData?.rows}
                columns={columns}
                loading={getJournalOfRegulatoryWorkTableDataFxIsLoading}
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={journalOfRegulatoryWorkTableData?.totalPageCount}
                rowsCount={journalOfRegulatoryWorkTableData?.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
