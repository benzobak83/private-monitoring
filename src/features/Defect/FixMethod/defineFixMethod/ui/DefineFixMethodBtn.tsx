import { ButtonProps } from '@mui/material'
import { FC, ReactNode, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'

type DefineFixMethodBtnProps = {
    formId: string
    btnText: ReactNode
    btnParams?: ButtonProps
    modalText: string
    loading?: boolean
}

const initModals = {
    defineFixMethodModal: false,
}

export const DefineFixMethodBtn: FC<DefineFixMethodBtnProps> = ({
    formId,
    modalText,
    btnParams = {},
    loading,
    btnText,
}) => {
    const { registerTrigger, registerModal, closeModal } = useModal(initModals)
    const {
        formState: { errors },
    } = useFormContext()

    useEffect(() => {
        if (!!Object.keys(errors).length) {
            closeModal()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    return (
        <>
            <MyButton
                isLoading={loading}
                {...(btnParams as any)}
                {...registerTrigger('defineFixMethodModal')}
            >
                {btnText}
            </MyButton>
            <ModalAreYouSure
                {...registerModal('defineFixMethodModal')}
                form={formId}
                bodyText={modalText}
            />
        </>
    )
}
