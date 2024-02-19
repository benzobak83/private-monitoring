import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

type RefuseAgreementBtnProps = {
    formId: string
    loading: boolean
}

const initModals = {
    refuseAgreementModal: false,
}

export const RefuseAgreementBtn: FC<RefuseAgreementBtnProps> = ({
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
                color="error"
                {...registerTrigger('refuseAgreementModal')}
            >
                Вернуть в работу
            </MyButton>
            <ModalAreYouSure
                {...registerModal('refuseAgreementModal')}
                bodyText="Вы собираетесь вернуть работу мастеру"
                form={formId}
            />
        </>
    )
}
