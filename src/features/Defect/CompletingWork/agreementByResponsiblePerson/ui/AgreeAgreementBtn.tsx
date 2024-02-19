import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

type AgreeAgreementBtnProps = {
    formId: string
    loading: boolean
}

const initModals = {
    agreeAgreementModal: false,
}

export const AgreeAgreementBtn: FC<AgreeAgreementBtnProps> = ({
    formId,
    loading,
}) => {
    const { registerTrigger, registerModal } = useModal(initModals)
    return (
        <>
            <MyButton
                type="submit"
                variant="contained"
                isLoading={loading}
                color="success"
                {...registerTrigger('agreeAgreementModal')}
            >
                Работы завершены
            </MyButton>
            <ModalAreYouSure
                {...registerModal('agreeAgreementModal')}
                bodyText="Вы собираетесь согласовать работу мастера"
                form={formId}
            />
        </>
    )
}
