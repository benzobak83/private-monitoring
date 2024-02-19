import { FC, useState } from 'react'
import { FixMethodTypeIds } from '@entities/Defect'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { goToPlanningWorkFx } from '../model/goToPlanningWork'

type BuyNewEquipmentBtnProps = {
    defectId: number
    diagnosticId: number
}

const initModals = {
    buyNewEquipmentModal: false,
}

export const BuyNewEquipmentBtn: FC<BuyNewEquipmentBtnProps> = ({
    defectId,
    diagnosticId,
}) => {
    const modalMethods = useModal(initModals)
    const { registerModal, registerTrigger } = modalMethods

    const [loading, setLoading] = useState<boolean>(false)

    const onClick = () => {
        setLoading(true)

        goToPlanningWorkFx({
            id: defectId,
            diagnosticId,
            data: { method: FixMethodTypeIds.BUY_NEW },
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <>
            <MyButton
                variant="contained"
                color="warning"
                {...registerTrigger('buyNewEquipmentModal')}
            >
                Приобретение нового
            </MyButton>
            <ModalAreYouSure
                {...registerModal('buyNewEquipmentModal')}
                title="Вы уверены?"
                loading={loading}
                buttonText="Подтвердить"
                handleClickButton={onClick}
                bodyText={'Вы собираетесь совершить приобретение нового'}
            />
        </>
    )
}
