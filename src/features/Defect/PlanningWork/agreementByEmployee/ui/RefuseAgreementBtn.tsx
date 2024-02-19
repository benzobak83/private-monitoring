import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

type RefuseAgreementBtnProps = {
    formId: string
    loading: boolean
    disabled?: boolean
}

const initModals = {
    refuseAgreementModal: false,
}

export const RefuseAgreementBtn: FC<RefuseAgreementBtnProps> = ({
    formId,
    loading,
    disabled,
}) => {
    const { registerTrigger, registerModal } = useModal(initModals)
    return (
        <>
            <MyButton
                type="submit"
                variant="contained"
                isLoading={loading}
                color="error"
                disabled={disabled}
                {...registerTrigger('refuseAgreementModal')}
            >
                Не согласовано
            </MyButton>
            <ModalAreYouSure
                {...registerModal('refuseAgreementModal')}
                bodyText="Вы собираетесь передать работу начальнику подразделения"
                form={formId}
            />
        </>
    )
}
