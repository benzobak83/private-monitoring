import { useStore } from 'effector-react'
import { debounce } from 'lodash'
import { FC, useEffect } from 'react'
import {
    $equipmentlistTableData,
    getEquipmentlistTableDataFx,
} from '@entities/Equipment'
import { FilterKeys, TFilter } from '@entities/Filter'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { usePagination } from '@shared/lib/hooks/usePagination'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

type EquipmentTableProps = {
    filter: TFilter['equipment'] | TFilter['equipmentOfObject']
    height?: string
    objectId?: number
}

const getEquipmentlistTableDataFxDebounced = debounce(
    (
        page: number | string,
        rowsPerPage: number,
        filter:
            | TFilter[FilterKeys.EQUIPMENT]
            | TFilter[FilterKeys.EQUIPMENT_OF_OBJECT],
        objectId: number | undefined
    ) => {
        getEquipmentlistTableDataFx({
            page,
            limit: rowsPerPage,
            filter: objectId ? { ...filter, objectId } : filter,
        })
    },
    10
)

//используется queryFilter

export const EquipmentTable: FC<EquipmentTableProps> = ({
    filter,
    objectId,
    height = HEIGHT_FOR_TABLE_WITH_FILTER,
}) => {
    const equipmentlistTableData = useStore($equipmentlistTableData)
    const getEquipmentlistTableDataFxIsLoading = useStore(
        getEquipmentlistTableDataFx.pending
    )

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getEquipmentlistTableDataFxDebounced(
            page,
            rowsPerPage,
            filter,
            objectId
        )
    }, [page, rowsPerPage, filter, objectId])

    return (
        <>
            <MyStyledDataGrid
                rows={equipmentlistTableData.rows || []}
                columns={columns}
                loading={getEquipmentlistTableDataFxIsLoading}
                height={height}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={equipmentlistTableData.totalPageCount}
                rowsCount={equipmentlistTableData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
