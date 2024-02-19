import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { TVoidFunc } from '@shared/types/Global'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import {
    TStartInspectionFxRequest,
    startInspectionFx,
} from '../model/startInspection'

const initModals = {
    startInspectionModal: false,
}

type StartInspectionButtonProps = {
    btnText: string
    data: TStartInspectionFxRequest
    reloadPage?: TVoidFunc
}

export const StartInspectionButton: FC<StartInspectionButtonProps> = ({
    btnText = 'Провести осмотр заново',
    data,
    reloadPage,
}) => {
    const startInspectionFxIsLoading = useStore(startInspectionFx.pending)
    const { registerModal, registerTrigger, closeModal } = useModal(initModals)

    const handleSubmit = () => {
        startInspectionFx(data).then(() => {
            closeModal()
            reloadPage?.()
        })
    }
    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                {...registerTrigger('startInspectionModal')}
            >
                {btnText}
            </Button>
            <ModalAreYouSure
                {...registerModal('startInspectionModal')}
                title={'Вы уверены?'}
                loading={startInspectionFxIsLoading}
                buttonText="Подтвердить"
                handleClickButton={handleSubmit}
                bodyText={'Вы собираетесь провести осмотр'}
            />
        </>
    )
}
