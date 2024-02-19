import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $typesOfEquipmentTableData,
    getTypesOfEquipmentListFx,
    resetTypesOfEquipmentTableData,
} from '@entities/Settings/TypesOfEquipment'
import { useModal } from '@shared/lib/hooks/useModal'
import { usePagination } from '@shared/lib/hooks/usePagination'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

const initModals = {
    deleteTypeOfEquipment: false,
}

export const TypesOfEquipmentTable: FC = () => {
    const typesOfEquipmentTableData = useStore($typesOfEquipmentTableData)
    const getTypesOfEquipmentListFxIsPending = useStore(
        getTypesOfEquipmentListFx.pending
    )

    const modalMethods = useModal(initModals)

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getTypesOfEquipmentListFx({ page, limit: rowsPerPage })
    }, [page, rowsPerPage])

    useEffect(() => {
        return () => {
            resetTypesOfEquipmentTableData()
        }
    }, [])
    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={typesOfEquipmentTableData.rows || []}
                columns={columns}
                sx={{ minHeight: '80vh' }}
                loading={getTypesOfEquipmentListFxIsPending}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={typesOfEquipmentTableData.totalPageCount}
                rowsCount={typesOfEquipmentTableData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </ModalProvider>
    )
}
