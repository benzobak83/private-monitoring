import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { createChecklistWorkFx } from '../model/create'
import { CreateChecklistWorkForm } from './CreateChecklistWorkForm'

const initModals = {
    createChecklistWorkModal: false,
}

export const CreateChecklistWorkButton: FC = () => {
    const createChecklistWorkFxIsLoading = useStore(
        createChecklistWorkFx.pending
    )

    const modalMethods = useModal(initModals)
    const { registerTrigger, registerModal } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <Button
                variant="contained"
                color="success"
                {...registerTrigger('createChecklistWorkModal')}
            >
                Добавить
            </Button>
            <MyModal
                {...registerModal('createChecklistWorkModal')}
                title="Создание чеклиста регламентных работ"
                loading={createChecklistWorkFxIsLoading}
            >
                <CreateChecklistWorkForm />
            </MyModal>
        </ModalProvider>
    )
}
