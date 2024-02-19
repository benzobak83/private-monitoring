import { useStore } from 'effector-react'
import { FC } from 'react'
import { SortTableControllers } from '@/features/General/sortingTable'
import { useSortChecklistWorkItemsTableStore } from '@/features/Settings/ChecklistWork/sortItems'
import { deleteChecklistItem } from '@features/Settings/ChecklistWork/deleteItem'
import {
    $checklistWork,
    useChecklistWorkItemStore,
} from '@entities/Settings/ChecklistWork'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { EditChecklistItemForm } from '../../EditChecklistItemForm'
import { columns } from '../lib/columns'

const initModals = {
    deleteChecklistItemModal: false,
    editChecklistItemModal: false,
}

export const ChecklistWorkItemsTable: FC = () => {
    const checklistWork = useStore($checklistWork)
    const deleteChecklistItemIsPending = useStore(deleteChecklistItem.pending)

    const [checklistWorkItem] = useChecklistWorkItemStore((store) => store)

    const [{ rows }] = useSortChecklistWorkItemsTableStore((store) => store)

    const modalMethods = useModal(initModals)
    const { registerModal, closeModal } = modalMethods

    const deleteChecklistItemQuery = (id: number) => () => {
        deleteChecklistItem(id).then(closeModal)
    }

    return (
        <ModalProvider {...modalMethods}>
            <MyStyledDataGrid
                rows={rows}
                columns={columns}
                loading={deleteChecklistItemIsPending}
                sx={{ width: 'fit-content' }}
            />

            <SortTableControllers
                useSortStore={useSortChecklistWorkItemsTableStore}
                rows={checklistWork.checklistItems}
            />

            <MyModal
                {...registerModal('editChecklistItemModal')}
                title="Редактирование варианта ответа"
            >
                <EditChecklistItemForm />
            </MyModal>

            <ModalAreYouSure
                {...registerModal('deleteChecklistItemModal')}
                title={'Вы уверены?'}
                buttonText="Подтвердить"
                loading={deleteChecklistItemIsPending}
                bodyText={'Вы собираетесь удалить данный пункт чеклиста'}
                handleClickButton={deleteChecklistItemQuery(
                    checklistWorkItem.id
                )}
            />
        </ModalProvider>
    )
}
