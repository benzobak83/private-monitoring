import { Button } from '@mui/material'
import { FC } from 'react'
import {
    TRegulatoryWorkListItem,
    useRegulatoryWorkTableStore,
} from '@entities/RegulatoryWork'
import { useModalContext } from '@shared/providers/ModalProvider'

type PickMasterForRegulatoryWorkBtnProps = {
    regulatoryWork: TRegulatoryWorkListItem
}

export const PickMasterForRegulatoryWorkBtn: FC<
    PickMasterForRegulatoryWorkBtnProps
> = ({ regulatoryWork }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [regulatoryWorkFromContext, setRegulatoryWork] =
        useRegulatoryWorkTableStore((store) => store)

    const { openModal } = useModalContext()

    const handleClick = (e: React.MouseEvent) => {
        openModal(e)
        setRegulatoryWork(regulatoryWork)
    }
    return (
        <Button data-modal-type="pickMasterModal" onClick={handleClick}>
            Назначить мастера
        </Button>
    )
}
