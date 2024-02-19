import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import {
    TChecklistWorkWithItems,
    getChecklistWork,
} from '@entities/Settings/ChecklistWork'
import { useModal } from '@shared/lib/hooks/useModal'
import { TAnyFunc } from '@shared/types/Global'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { CompleteWorkForm } from './CompleteWorkForm'

type CompleteWorkBtnProps = {
    checkId: number
    variantBtn?: 'text' | 'contained' | 'outlined'
    checklistId: number
    cbAfterComplete?: TAnyFunc
}

const initModals = {
    completeWorkModal: false,
}

export const CompleteWorkBtn: FC<CompleteWorkBtnProps> = ({
    variantBtn = 'text',
    checkId,
    cbAfterComplete: cbAfterCompleteFromProps,
    checklistId,
}) => {
    const getChecklistWorkIsLoading = useStore(getChecklistWork.pending)

    const [checklistWork, setChecklistWork] = useState<TChecklistWorkWithItems>(
        {} as TChecklistWorkWithItems
    )
    const [needLoadCheck, setNeedLoadCheck] = useState<boolean>(false)

    const { registerModal, openModal, closeModal } = useModal(initModals)

    const handleClick = (e: React.MouseEvent) => {
        openModal(e)
        setNeedLoadCheck(true)
    }

    const cbAfterComplete = () => {
        closeModal()
        cbAfterCompleteFromProps?.()
    }

    useEffect(() => {
        if (!needLoadCheck) return

        getChecklistWork(checklistId).then((res) => {
            setChecklistWork(res.data.data)
        })
    }, [checklistId, needLoadCheck])
    return (
        <>
            <Button
                variant={variantBtn}
                data-modal-type="completeWorkModal"
                onClick={handleClick}
            >
                Выполнить
            </Button>
            <MyModal
                title="Регламентные работы"
                loadingWithBlockInterface={getChecklistWorkIsLoading}
                {...registerModal('completeWorkModal')}
            >
                <CompleteWorkForm
                    cbAfterComplete={cbAfterComplete}
                    checklistWork={checklistWork}
                    checkId={checkId}
                />
            </MyModal>
        </>
    )
}
