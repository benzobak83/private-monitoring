import { useStore } from 'effector-react'
import { useChecklistMaintenanceStore } from '@entities/Settings/TypesOfEquipment'
import { useModalContext } from '@shared/providers/ModalProvider'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { deleteChecklistOfTypeEquipment } from '../model/deleteChecklist'

export const DeleteChecklistModal = () => {
    const deleteChecklistOfTypeEquipmentIsPending = useStore(
        deleteChecklistOfTypeEquipment.pending
    )

    const { registerModal, closeModal } = useModalContext()

    const [checklist] = useChecklistMaintenanceStore((store) => store)

    return (
        <ModalAreYouSure
            {...registerModal('deleteChecklist')}
            title={'Вы уверены?'}
            buttonText="Подтвердить"
            loading={deleteChecklistOfTypeEquipmentIsPending}
            bodyText={'Вы собираетесь удалить чеклист регламентных работ'}
            handleClickButton={() =>
                deleteChecklistOfTypeEquipment(checklist.id).then(closeModal)
            }
        />
    )
}
