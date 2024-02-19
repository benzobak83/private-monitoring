import { useStore } from 'effector-react'
import { FC } from 'react'
import { SortTableControllers } from '@/features/General/sortingTable'
import { useSortChecklistInspectionItemsTableStore } from '@/features/Settings/ChecklistInspection/sortItems'
import { deleteChecklistItem } from '@features/Settings/ChecklistInspection/deleteItem'
import {
    $checklistInspection,
    getChecklistInspection,
    useChecklistInspectionItemStore,
} from '@entities/Settings/ChecklistInspection'
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

export const ChecklistInspectionItemsTable: FC = () => {
    const checklistInspection = useStore($checklistInspection)
    const deleteChecklistItemIsPending = useStore(deleteChecklistItem.pending)
    const getChecklistInspectionIsPending = useStore(
        getChecklistInspection.pending
    )

    const [checklistInspectionItem] = useChecklistInspectionItemStore(
        (store) => store
    )

    const [{ rows }] = useSortChecklistInspectionItemsTableStore(
        (store) => store
    )

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
                loading={
                    deleteChecklistItemIsPending ||
                    getChecklistInspectionIsPending
                }
                sx={{ width: 'fit-content' }}
            />

            <SortTableControllers
                useSortStore={useSortChecklistInspectionItemsTableStore}
                rows={checklistInspection.checklistItems}
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
                    checklistInspectionItem.id
                )}
            />
        </ModalProvider>
    )
}
