import { FC, useState } from 'react'
import { FixMethodTypeIds } from '@entities/Defect'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { goToPlanningWorkFx } from '..'

type ContractOutBtnProps = {
    defectId: number
    diagnosticId: number
}

const initModals = {
    contractOutModal: false,
}

export const ContractOutBtn: FC<ContractOutBtnProps> = ({
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
            data: { method: FixMethodTypeIds.CONTRACT },
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <>
            <MyButton
                variant="contained"
                {...registerTrigger('contractOutModal')}
            >
                Отдать на подряд
            </MyButton>
            <ModalAreYouSure
                {...registerModal('contractOutModal')}
                title="Вы уверены?"
                buttonText="Подтвердить"
                loading={loading}
                handleClickButton={onClick}
                bodyText={'Вы собираетесь отдать на подряд'}
            />
        </>
    )
}
