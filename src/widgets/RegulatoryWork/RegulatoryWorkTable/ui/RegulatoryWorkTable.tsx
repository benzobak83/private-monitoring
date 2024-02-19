import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import { PickMasterForRegulatoryWorkForm } from '@/features/RegulatoryWork/pickMasterForRegulatoryWork'
import { StartRegulatoryWorkForm } from '@/features/RegulatoryWork/startRegulatoryWork/ui/StartRegulatoryWorkForm'
import { $filter } from '@entities/Filter'
import { useRegulatoryWorkTableStore } from '@entities/RegulatoryWork'
import {
    $regulatoryWorkListTableData,
    getRegulatoryWorkListTableDataFx,
} from '@entities/RegulatoryWork/model/getList'
import { ROWS } from '@shared/lib/consts/mock'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { useModal } from '@shared/lib/hooks/useModal'
import { usePagination } from '@shared/lib/hooks/usePagination'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

const initModals = {
    startRegulatoryWorkModal: false,
    pickMasterModal: false,
}

export const RegulatoryWorkTable: FC = () => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        rows = [],
        totalPageCount,
        totalRowCount,
    } = useStore($regulatoryWorkListTableData)
    const getRegulatoryWorkListTableDataFxIsLoading = useStore(
        getRegulatoryWorkListTableDataFx.pending
    )
    const regulatoryWorkFilter = useStoreMap(
        $filter,
        (store) => store.regulatoryWork || {}
    )

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    const [regulatoryWork] = useRegulatoryWorkTableStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal } = modalMethods

    useEffect(() => {
        getRegulatoryWorkListTableDataFx({
            limit: rowsPerPage,
            page,
            sort: 'id',
            filter: regulatoryWorkFilter,
        })
    }, [rowsPerPage, page, regulatoryWorkFilter])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={ROWS}
                columns={columns}
                loading={getRegulatoryWorkListTableDataFxIsLoading}
                sx={{ minHeight: HEIGHT_FOR_TABLE_WITH_FILTER }}
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
                title="Начать работу"
                {...registerModal('startRegulatoryWorkModal')}
            >
                <StartRegulatoryWorkForm regulatoryWork={regulatoryWork} />
            </MyModal>
            <MyModal
                title="Назначить мастера"
                {...registerModal('pickMasterModal')}
            >
                <PickMasterForRegulatoryWorkForm
                    regulatoryWork={regulatoryWork}
                />
            </MyModal>
        </ModalProvider>
    )
}
