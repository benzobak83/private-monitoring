import { useStore, useStoreMap } from 'effector-react'
import { debounce } from 'lodash'
import { FC, useEffect } from 'react'
import { StartWorkForm } from '@/features/Work/startWork/ui/StartWorkForm/StartWorkForm'
import { $filter } from '@entities/Filter'
import { $startWorkListTableData, useStartWorkStore } from '@entities/Work'
import {
    $startWorkListTableDataIsReloaded,
    GetStartWorkListTableDataFxRequest,
    getStartWorkListTableDataFx,
} from '@entities/Work/model/getStartWorkList'
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

const getStartWorkListTableDataFxDebounced = debounce(
    (data: GetStartWorkListTableDataFxRequest) => {
        getStartWorkListTableDataFx(data)
    },
    100
)

export const StartWorkTable: FC = () => {
    const {
        rows = [],
        totalPageCount,
        totalRowCount,
    } = useStore($startWorkListTableData)
    const startWorkListTableDataIsReloaded = useStore(
        $startWorkListTableDataIsReloaded
    )

    const getStartWorklistTableDataFxIsLoading = useStore(
        getStartWorkListTableDataFx.pending
    )
    const startWorkFilter = useStoreMap(
        $filter,
        (store) => store.startWork || {}
    )

    const [work] = useStartWorkStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal } = modalMethods

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getStartWorkListTableDataFxDebounced({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: startWorkFilter,
        })
    }, [rowsPerPage, page, startWorkFilter, startWorkListTableDataIsReloaded])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={rows}
                columns={columns}
                loading={getStartWorklistTableDataFxIsLoading}
                sx={{ height: '68.5vh', minHeight: '68.5vh' }}
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
