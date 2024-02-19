import { Button } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'

type TransferToEngineerWithoutAgreementBtnProps = {
    formId: string
}

const initialModals = {
    notAgreedModal: false,
}

export const TransferToEngineerWithoutAgreementBtn: FC<
    TransferToEngineerWithoutAgreementBtnProps
> = ({ formId }) => {
    const modalMethods = useModal(initialModals)

    const { registerModal, registerTrigger } = modalMethods
    return (
        <>
            <Button
                variant="contained"
                color="error"
                {...registerTrigger('notAgreedModal')}
            >
                Не согласовано, передать <br /> главному инженеру
            </Button>
            <ModalAreYouSure
                {...registerModal('notAgreedModal')}
                title="Вы уверены?"
                form={formId}
                buttonText="Подтвердить"
                bodyText={
                    'Вы собираетесь выполнить "Не согласовано, передать главному инженеру"'
                }
            />
        </>
    )
}
