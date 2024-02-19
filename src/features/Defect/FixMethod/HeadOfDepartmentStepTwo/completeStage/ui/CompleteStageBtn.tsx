import { Button } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'

type CompleteStageBtnProps = {
    formId: string
}

const initialModals = {
    completeModal: false,
}

export const CompleteStageBtn: FC<CompleteStageBtnProps> = ({ formId }) => {
    const modalMethods = useModal(initialModals)

    const { registerModal, registerTrigger } = modalMethods
    return (
        <>
            <Button
                color="success"
                variant="contained"
                {...registerTrigger('completeModal')}
            >
                Завершить стадию определения <br /> метода устранения
            </Button>
            <ModalAreYouSure
                {...registerModal('completeModal')}
                title="Вы уверены?"
                buttonText="Подтвердить"
                form={formId}
                bodyText={
                    'Вы собираетесь завершить стадию "Определение метода устранения"'
                }
            />
        </>
    )
}
