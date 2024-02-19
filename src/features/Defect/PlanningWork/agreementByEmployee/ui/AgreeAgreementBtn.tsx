import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

type AgreeAgreementBtnProps = {
    formId: string
    loading: boolean
    disabled?: boolean
}

const initModals = {
    agreeAgreementModal: false,
}

export const AgreeAgreementBtn: FC<AgreeAgreementBtnProps> = ({
    formId,
    loading,
    disabled,
}) => {
    const { registerTrigger, registerModal } = useModal(initModals)
    return (
        <>
            <MyButton
                disabled={disabled}
                type="submit"
                variant="contained"
                isLoading={loading}
                color="success"
                {...registerTrigger('agreeAgreementModal')}
            >
                Согласовано
            </MyButton>
            <ModalAreYouSure
                {...registerModal('agreeAgreementModal')}
                bodyText="Вы собираетесь согласовать работу"
                form={formId}
            />
        </>
    )
}
