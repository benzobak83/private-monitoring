import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { deleteChecklistWork } from '@features/Settings/ChecklistWork/delete'
import {
    $checklistWorkList,
    getChecklistWorkList,
    useChecklistWorkStore,
} from '@entities/Settings/ChecklistWork'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'
const initModals = {
    deleteChecklistWorkModal: false,
}

export const ChecklistWorkTable: FC = () => {
    const checklistWorkList = useStore($checklistWorkList)
    const getChecklistWorkListIsPending = useStore(getChecklistWorkList.pending)
    const deleteChecklistWorkIsPending = useStore(deleteChecklistWork.pending)

    const [checklistWork] = useChecklistWorkStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal, closeModal } = modalMethods

    const deleteChecklistQuery = (id: number) => () => {
        deleteChecklistWork(id).then(closeModal)
    }

    useEffect(() => {
        getChecklistWorkList()
    }, [])

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={checklistWorkList}
                columns={columns}
                loading={getChecklistWorkListIsPending}
                sx={{ width: 'fit-content' }}
            />

            <ModalAreYouSure
                {...registerModal('deleteChecklistWorkModal')}
                title={'Вы уверены?'}
                buttonText="Подтвердить"
                loading={deleteChecklistWorkIsPending}
                bodyText={'Вы собираетесь удалить чеклист регламентных работ'}
                handleClickButton={deleteChecklistQuery(checklistWork.id)}
            />
        </ModalProvider>
    )
}
