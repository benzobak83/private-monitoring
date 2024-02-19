import { Typography } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

const initModals = {
    transferWorkToHeadOfTheDepartmentModal: false,
}

type TransferWorkToHeadOfTheDepartmentBtnProps = {
    formId: string
    loading?: boolean
}

export const TransferWorkToHeadOfTheDepartmentBtn: FC<
    TransferWorkToHeadOfTheDepartmentBtnProps
> = ({ formId, loading }) => {
    const { registerModal, registerTrigger } = useModal(initModals)
    return (
        <>
            <MyButton
                variant="contained"
                isLoading={loading}
                color="error"
                {...registerTrigger('transferWorkToHeadOfTheDepartmentModal')}
            >
                <Typography>
                    Не могу устранить сам <br /> Передать в работу начальнику
                    подразделения
                </Typography>
            </MyButton>
            <ModalAreYouSure
                loading={loading}
                {...registerModal('transferWorkToHeadOfTheDepartmentModal')}
                bodyText="Вы собираетесь передать в работу начальнику подразделения"
                form={formId}
            />
        </>
    )
}
