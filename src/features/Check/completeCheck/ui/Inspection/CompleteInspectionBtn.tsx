import { Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import {
    TChecklistInspectionWithItems,
    getChecklistInspection,
} from '@entities/Settings/ChecklistInspection'
import { useModal } from '@shared/lib/hooks/useModal'
import { TAnyFunc } from '@shared/types/Global'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { CompleteInspectionForm } from './CompleteInspectionForm'

type CompleteInspectionBtnProps = {
    checkId: number
    variantBtn?: 'text' | 'contained' | 'outlined'
    checklistId: number
    cbAfterComplete?: TAnyFunc
}

const initModals = {
    completeInspectionModal: false,
}

export const CompleteInspectionBtn: FC<CompleteInspectionBtnProps> = ({
    variantBtn = 'text',
    checkId,
    cbAfterComplete: cbAfterCompleteFromProps,
    checklistId,
}) => {
    const getChecklistInspectionIsLoading = useStore(
        getChecklistInspection.pending
    )

    const [checklistOfInspection, setChecklistOfInspection] =
        useState<TChecklistInspectionWithItems>(
            {} as TChecklistInspectionWithItems
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

        getChecklistInspection(checklistId).then((res) => {
            setChecklistOfInspection(res.data.data)
        })
    }, [checklistId, needLoadCheck])
    return (
        <>
            <Button
                variant={variantBtn}
                data-modal-type="completeInspectionModal"
                onClick={handleClick}
            >
                Выполнить
            </Button>
            <MyModal
                title="Проверка состояния"
                loadingWithBlockInterface={getChecklistInspectionIsLoading}
                {...registerModal('completeInspectionModal')}
            >
                <CompleteInspectionForm
                    checkId={checkId}
                    checklistInspection={checklistOfInspection}
                    cbAfterComplete={cbAfterComplete}
                />
            </MyModal>
        </>
    )
}
