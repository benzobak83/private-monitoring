import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { createChecklistInspectionFx } from '../model/create'
import { CreateChecklistInspectionForm } from './CreateChecklistInspectionForm'

const initModals = {
    createChecklistInspectionModal: false,
}

export const CreateChecklistInspectionButton: FC = () => {
    const createChecklistInspectionFxIsLoading = useStore(
        createChecklistInspectionFx.pending
    )

    const modalMethods = useModal(initModals)
    const { registerTrigger, registerModal } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <Button
                variant="contained"
                color="success"
                {...registerTrigger('createChecklistInspectionModal')}
            >
                Добавить
            </Button>
            <MyModal
                {...registerModal('createChecklistInspectionModal')}
                title="Создание чеклиста осмотра и проверок"
                loading={createChecklistInspectionFxIsLoading}
            >
                <CreateChecklistInspectionForm />
            </MyModal>
        </ModalProvider>
    )
}
