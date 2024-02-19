import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { AnswerOfChecklistItemList } from '@entities/Settings/ChecklistWork'
import { useModal } from '@shared/lib/hooks/useModal'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { getCheckOfHistoryFx } from '../../model/getCheckOfHistory'
import { TCheckOfHistory } from '../../model/types/types'

type CompleteWorkBtnProps = {
    variantBtn?: 'text' | 'contained'
    btnText: string
    checkId: number
}

const initModals = {
    completeWorkModal: false,
}

export const ViewWorkBtn: FC<CompleteWorkBtnProps> = ({
    variantBtn = 'text',
    btnText,
    checkId,
}) => {
    const getCheckOfHistoryFxIsLoading = useStore(getCheckOfHistoryFx.pending)

    const [checkOfHistory, setCheckOfHistory] = useState<TCheckOfHistory>(
        {} as TCheckOfHistory
    )

    const [needLoadCheck, setNeedLoadCheck] = useState<boolean>(false)

    const { registerModal, openModal } = useModal(initModals)

    const handleClick = (e: React.MouseEvent) => {
        openModal(e)
        setNeedLoadCheck(true)
    }

    useEffect(() => {
        if (!needLoadCheck) return

        getCheckOfHistoryFx(checkId).then((res) => {
            setCheckOfHistory(res.data.data)
        })
    }, [checkId, needLoadCheck])
    return (
        <>
            <Button
                variant={variantBtn}
                data-modal-type="completeWorkModal"
                onClick={handleClick}
            >
                {btnText}
            </Button>
            <MyModal
                title="Регламентные работы"
                loadingWithBlockInterface={getCheckOfHistoryFxIsLoading}
                {...registerModal('completeWorkModal')}
            >
                <AnswerOfChecklistItemList
                    checklistItems={checkOfHistory?.checklist?.checklistItems}
                />
            </MyModal>
        </>
    )
}
