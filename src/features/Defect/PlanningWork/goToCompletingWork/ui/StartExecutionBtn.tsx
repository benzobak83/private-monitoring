import { Button, ButtonProps } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { usePlanningWorkContext } from '@entities/Defect/model/providers/PlanningWorkProvider'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModal } from '@shared/lib/hooks/useModal'
import { ModalAreYouSure } from '@shared/ui/Modals/ModalAreYouSure/ModalAreYouSure'
import { goToCompletingWork } from '../model/goToCompletingWork'

const initModals = {
    startExecutionModal: false,
}

export const StartExecutionBtn: FC<ButtonProps> = ({ ...props }) => {
    const goToCompletingWorkIsLoading = useStore(goToCompletingWork.pending)

    const { registerModal, registerTrigger, closeModal } = useModal(initModals)

    const { planningWork } = usePlanningWorkContext()

    const { id } = useDefaultParams()

    const handleClickButton = () => {
        goToCompletingWork({
            defectId: id,
            planningId: planningWork.id,
        }).finally(() => {
            closeModal()
        })
    }
    return (
        <>
            <Button
                variant="contained"
                sx={{ width: 'fit-content' }}
                {...props}
                {...registerTrigger('startExecutionModal')}
            >
                Выполнение начато
            </Button>
            <ModalAreYouSure
                {...registerModal('startExecutionModal')}
                loading={goToCompletingWorkIsLoading}
                bodyText={'Вы собираетесь начать выполнение работ'}
                handleClickButton={handleClickButton}
            />
        </>
    )
}
