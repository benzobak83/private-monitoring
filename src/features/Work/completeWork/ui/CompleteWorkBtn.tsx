import { Button } from '@mui/material'
import { FC } from 'react'
import { TWork } from '@entities/Work'
import { TWorkOfObject } from '@entities/Work/model/types'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { TAnyFunc } from '@shared/types/Global'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { CompleteWorkForm } from './CompleteWorkForm'

const initModals = {
    completeWorkModal: false,
}

type CompleteWorkBtnProps = {
    work: TWork | TWorkOfObject
    workName?: string
    cbAfterQuery?: TAnyFunc
}

export const CompleteWorkBtn: FC<CompleteWorkBtnProps> = ({
    work,
    workName,
    cbAfterQuery,
}) => {
    const modalMethods = useModal(initModals)
    const { registerModal, registerTrigger } = modalMethods
    return (
        <ModalProvider {...modalMethods}>
            <Button
                variant="contained"
                {...registerTrigger('completeWorkModal')}
            >
                Завершить
            </Button>
            <MyModal
                title="Завершение смены"
                {...registerModal('completeWorkModal')}
            >
                <CompleteWorkForm
                    work={work}
                    workName={workName}
                    cbAfterQuery={cbAfterQuery}
                />
            </MyModal>
        </ModalProvider>
    )
}
