import { useStore, useStoreMap } from 'effector-react'
import { debounce } from 'lodash'
import { FC, useEffect, useMemo } from 'react'
import { $filter, FilterKeys, TFilter } from '@entities/Filter'
import {
    $objectlistTableData,
    getObjectlistTableDataFx,
} from '@entities/Object/model/getList'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

const getObjectlistTableDataFxDebounced = debounce(
    (
        rowsPerPage: number,
        page: number | string,
        objectFilter: TFilter[FilterKeys.OBJECT]
    ) =>
        getObjectlistTableDataFx({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: objectFilter,
        }),
    10
)

//используется queryFilter

export const ObjectTable: FC = () => {
    const {
        rows = [],
        totalPageCount,
        totalRowCount,
        countEquipment,
    } = useStore($objectlistTableData)
    const getObjectlistTableDataFxIsLoading = useStore(
        getObjectlistTableDataFx.pending
    )
    const objectFilter = useStoreMap($filter, (store) => store.object || {})

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    const filteredRows = useMemo(() => {
        if (!rows.length) return []

        const clonnedRows: any = structuredClone(rows)
        clonnedRows.push({
            id: 'Итого',
            equipmentCheck: countEquipment,
        })
        return clonnedRows
    }, [rows, countEquipment])

    useEffect(() => {
        getObjectlistTableDataFxDebounced(rowsPerPage, page, objectFilter)
    }, [rowsPerPage, page, objectFilter])

    return (
        <>
            <MyStyledDataGrid
                rows={filteredRows}
                columns={columns}
                loading={getObjectlistTableDataFxIsLoading}
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={totalPageCount}
                rowsCount={totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
