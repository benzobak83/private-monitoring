import { FC, useState } from 'react'
import { FixMethodTypeIds } from '@entities/Defect'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { goToPlanningWorkFx } from '../model/goToPlanningWork'

type TerminationOfOperationBtnProps = {
    defectId: number
    diagnosticId: number
}

const initModals = {
    terminationOfOperationModal: false,
}

export const TerminationOfOperationBtn: FC<TerminationOfOperationBtnProps> = ({
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
            data: { method: FixMethodTypeIds.TERMINATION_OF_EXPLOITATION },
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <>
            <MyButton
                color="error"
                variant="contained"
                {...registerTrigger('terminationOfOperationModal')}
            >
                Прекращение эксплуатации оборудования
            </MyButton>
            <ModalAreYouSure
                {...registerModal('terminationOfOperationModal')}
                title="Вы уверены?"
                loading={loading}
                buttonText="Подтвердить"
                handleClickButton={onClick}
                bodyText={
                    'Вы собираетесь совершить прекращение эксплуатации оборудования'
                }
            />
        </>
    )
}
