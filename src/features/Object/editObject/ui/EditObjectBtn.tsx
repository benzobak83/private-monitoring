import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { EditObjectForm } from './EditObjectForm'

const initModals = {
    editObjectModal: false,
}

export const EditObjectBtn: FC = () => {
    const modalMethods = useModal(initModals)
    const { registerModal, registerTrigger } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <IconButton
                color="primary"
                size="small"
                {...registerTrigger('editObjectModal')}
            >
                <EditIcon color="primary" />
            </IconButton>
            <MyModal
                title="Редактирование объекта"
                {...registerModal('editObjectModal')}
            >
                <EditObjectForm />
            </MyModal>
        </ModalProvider>
    )
}
