import { Button, ButtonTypeMap, ExtendButtonBase } from '@mui/material'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { FinishShiftForm } from './FinishShiftForm'

const initModals = {
    finishShiftModal: false,
}

type FinishShiftBtnProps = {
    text?: string
} & Partial<ExtendButtonBase<ButtonTypeMap<Record<string, any>, 'button'>>>

export const FinishShiftBtn: FC<FinishShiftBtnProps> = ({
    text = 'Завершить',
    ...props
}) => {
    const { registerModal, registerTrigger } = useModal(initModals)
    return (
        <>
            <Button
                color="primary"
                {...props}
                {...registerTrigger('finishShiftModal')}
            >
                {text}
            </Button>
            <MyModal
                {...registerModal('finishShiftModal')}
                title="Завершение смены"
            >
                <FinishShiftForm />
            </MyModal>
        </>
    )
}
