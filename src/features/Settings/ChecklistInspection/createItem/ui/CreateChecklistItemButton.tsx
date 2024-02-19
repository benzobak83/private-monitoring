import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { createChecklistItemFx } from '../model/create'
import { CreateChecklistItemForm } from './CreateChecklistItemForm'

const initModals = {
    createChecklistItemModal: false,
}

export const CreateChecklistItemButton: FC = () => {
    const createChecklistItemFxIsPending = useStore(
        createChecklistItemFx.pending
    )

    const modalMethods = useModal(initModals)
    const { registerTrigger, registerModal } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <Button
                variant="contained"
                color="success"
                {...registerTrigger('createChecklistItemModal')}
            >
                Добавить
            </Button>
            <MyModal
                {...registerModal('createChecklistItemModal')}
                title="Создание пункта чеклиста"
                loading={createChecklistItemFxIsPending}
            >
                <CreateChecklistItemForm />
            </MyModal>
        </ModalProvider>
    )
}
