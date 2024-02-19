import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

const initModals = {
    completingWorkModal: false,
}

type CompletingWorkBtnProps = {
    formId: string
    loading?: boolean
}

export const CompletingWorkBtn: FC<CompletingWorkBtnProps> = ({
    formId,
    loading,
}) => {
    const { registerModal, registerTrigger } = useModal(initModals)
    return (
        <>
            <MyButton
                variant="contained"
                color="success"
                isLoading={loading}
                {...registerTrigger('completingWorkModal')}
            >
                Работы завершены
            </MyButton>
            <ModalAreYouSure
                {...registerModal('completingWorkModal')}
                form={formId}
                loading={loading}
                bodyText="Вы собираетесь завершить работу"
            />
        </>
    )
}
