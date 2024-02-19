import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect, useMemo } from 'react'
import { StartWorkForm } from '@/features/Work/startWork'
import { $auth } from '@entities/Auth'
import { $filter } from '@entities/Filter'
import { $currentWork, useStartWorkStore } from '@entities/Work'
import {
    $workListTableDataIsReloaded,
    $worklistTableData,
    getWorklistTableDataFx,
} from '@entities/Work/model/getList'
import { useModal } from '@shared/lib/hooks/useModal'
import { usePagination } from '@shared/lib/hooks/usePagination'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

const initModals = {
    startWorkModal: false,
}

export const WorkTable: FC = () => {
    const {
        rows = [],
        totalPageCount,
        totalRowCount,
    } = useStore($worklistTableData)
    const workFromStore = useStore($currentWork)
    const workListTableDataIsReloaded = useStore($workListTableDataIsReloaded)
    const getWorklistTableDataFxIsLoading = useStore(
        getWorklistTableDataFx.pending
    )
    const workFilter = useStoreMap($filter, (store) => store.work || {})
    const auth = useStore($auth)

    const [work] = useStartWorkStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal } = modalMethods

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    const filteredColumns = useMemo(() => {
        if (workFromStore.isWorkInProgress) {
            return columns.filter((column) => column.field !== 'actions')
        }
        return columns
    }, [workFromStore.isWorkInProgress])

    useEffect(() => {
        getWorklistTableDataFx({
            limit: rowsPerPage,
            page,
            order: 'desc',
            sort: 'date_start',
            filter: { ...workFilter, userId: auth.user.id },
        })
    }, [
        rowsPerPage,
        page,
        workFilter,
        workListTableDataIsReloaded,
        auth.user.id,
    ])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={rows}
                columns={filteredColumns}
                loading={getWorklistTableDataFxIsLoading}
                sx={{ height: '66vh', minHeight: '66vh' }}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                pagesCount={totalPageCount}
                rowsCount={totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <MyModal
                {...registerModal('startWorkModal')}
                title="Выбор объекта для начала работы"
                sx={{ width: '350px' }}
            >
                <StartWorkForm work={work} />
            </MyModal>
        </ModalProvider>
    )
}
