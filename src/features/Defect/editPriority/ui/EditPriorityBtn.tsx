import { Typography } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { hoverOpacitySx } from '@shared/sx'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { EditPriorityForm } from './EditPriorityForm'

const initModals = {
    editPriorityModal: false,
}

type EditPriorityBtnProps = {
    priority: number
}

export const EditPriorityBtn: FC<EditPriorityBtnProps> = ({ priority }) => {
    const modalMethods = useModal(initModals)
    const { registerModal, registerTrigger } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <Typography
                {...registerTrigger('editPriorityModal')}
                sx={{ color: 'blue', ...hoverOpacitySx }}
            >
                {priority}
            </Typography>
            <MyModal
                title="Редактирование приоритета неисправности"
                {...registerModal('editPriorityModal')}
            >
                <EditPriorityForm priority={priority} />
            </MyModal>
        </ModalProvider>
    )
}
