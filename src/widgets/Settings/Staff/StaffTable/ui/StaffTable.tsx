import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    CreateStaffForm,
    createStaffFx,
} from '@features/Settings/Staff/CreateStaff'
import { EditStaffForm, editStaffFx } from '@features/Settings/Staff/EditStaff'
import { $filter } from '@entities/Filter'
import { $staffTableData, getStaffTableDataFx } from '@entities/Settings/Staff'
import { useModal } from '@shared/lib/hooks/useModal'
import { usePagination } from '@shared/lib/hooks/usePagination'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

const initModals = {
    editStaffModal: false,
    createStaffModal: false,
}

export const StaffTable: FC = () => {
    const createStaffFxIsLoading = useStore(createStaffFx.pending)
    const getStaffTableDataFxIsLoading = useStore(getStaffTableDataFx.pending)
    const editStaffFxIsLoading = useStore(editStaffFx.pending)
    const staffTableData = useStore($staffTableData)
    const staffFilter = useStoreMap($filter, (store) => store.staff)

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    const modalMethods = useModal(initModals)

    const { registerModal } = modalMethods

    useEffect(() => {
        getStaffTableDataFx({ page, limit: rowsPerPage, filter: staffFilter })
    }, [staffFilter, page, rowsPerPage])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={staffTableData.rows || []}
                sx={{ height: '72.5vh' }}
                loading={getStaffTableDataFxIsLoading}
                columns={columns}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={staffTableData.totalPageCount}
                rowsCount={staffTableData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <MyModal
                {...registerModal('editStaffModal')}
                title="Персонал"
                loading={createStaffFxIsLoading}
            >
                <CreateStaffForm />
            </MyModal>
            <MyModal
                {...registerModal('createStaffModal')}
                title="Персонал"
                loading={editStaffFxIsLoading}
            >
                <EditStaffForm />
            </MyModal>
        </ModalProvider>
    )
}
