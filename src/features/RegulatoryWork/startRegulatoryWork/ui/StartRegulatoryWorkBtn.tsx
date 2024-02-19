import { Button } from '@mui/material'
import { FC } from 'react'
import {
    TRegulatoryWorkListItem,
    useRegulatoryWorkTableStore,
} from '@entities/RegulatoryWork'
import { useModalContext } from '@shared/providers/ModalProvider'

type StartRegulatoryWorkBtnProps = {
    regulatoryWork: TRegulatoryWorkListItem
}

export const StartRegulatoryWorkBtn: FC<StartRegulatoryWorkBtnProps> = ({
    regulatoryWork,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [regulatoryWorkFromContext, setRegulatoryWork] =
        useRegulatoryWorkTableStore((store) => store)

    const { openModal } = useModalContext()

    const handleClick = (e: React.MouseEvent) => {
        openModal(e)
        setRegulatoryWork(regulatoryWork)
    }
    return (
        <Button
            data-modal-type="startRegulatoryWorkModal"
            onClick={handleClick}
        >
            Начать работу
        </Button>
    )
}
