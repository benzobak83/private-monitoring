import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { deleteChecklistInspection } from '@features/Settings/ChecklistInspection/delete'
import {
    $checklistInspectionList,
    getChecklistInspectionList,
    useChecklistInspectionStore,
} from '@entities/Settings/ChecklistInspection'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'
const initModals = {
    deleteChecklistInspectionModal: false,
}

export const ChecklistInspectionTable: FC = () => {
    const checklistInspectionList = useStore($checklistInspectionList)
    const getChecklistInspectionListIsPending = useStore(
        getChecklistInspectionList.pending
    )
    const deleteChecklistInspectionIsPending = useStore(
        deleteChecklistInspection.pending
    )

    const [checklistInspection] = useChecklistInspectionStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal, closeModal } = modalMethods

    const deleteChecklistQuery = (id: number) => () => {
        deleteChecklistInspection(id).then(closeModal)
    }

    useEffect(() => {
        getChecklistInspectionList()
    }, [])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={checklistInspectionList}
                columns={columns}
                loading={getChecklistInspectionListIsPending}
                sx={{
                    width: 'fit-content',
                    maxHeight: '82vh',
                }}
            />

            <ModalAreYouSure
                {...registerModal('deleteChecklistInspectionModal')}
                title={'Вы уверены?'}
                buttonText="Подтвердить"
                loading={deleteChecklistInspectionIsPending}
                bodyText={'Вы собираетесь удалить чеклист осмотров и проверок'}
                handleClickButton={deleteChecklistQuery(checklistInspection.id)}
            />
        </ModalProvider>
    )
}
