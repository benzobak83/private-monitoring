import { Button, SxProps, Theme } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { useModal } from '@shared/lib/hooks/useModal'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { getCheckOfHistoryFx } from '../../model/getCheckOfHistory'
import { TCheckOfHistory } from '../../model/types/types'
import { ViewInspectionBlock } from './ViewInspectionBlock'

type CompleteInspectionBtnProps = {
    variantBtn?: 'text' | 'contained'
    btnText: string
    checkId: number
    buttonSx?: SxProps<Theme>
}
const initModals = {
    completeInspectionModal: false,
}

export const ViewInspectionBtn: FC<CompleteInspectionBtnProps> = ({
    variantBtn = 'text',
    btnText,
    buttonSx = {},
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
                data-modal-type="completeInspectionModal"
                onClick={handleClick}
                sx={buttonSx}
            >
                {btnText}
            </Button>
            <MyModal
                title="Проверка состояния"
                loadingWithBlockInterface={getCheckOfHistoryFxIsLoading}
                {...registerModal('completeInspectionModal')}
            >
                <ViewInspectionBlock check={checkOfHistory} />
            </MyModal>
        </>
    )
}
