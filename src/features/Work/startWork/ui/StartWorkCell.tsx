import { Button } from '@mui/material'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import {
    TStartWorkContext,
    WorkStatusIcon,
    useStartWorkStore,
} from '@entities/Work'
import { useModalContext } from '@shared/providers/ModalProvider'

type StartWorkCellProps = {
    work: TStartWorkContext
    btnText?: string
    withIcon?: boolean
}

export const StartWorkCell: FC<StartWorkCellProps> = ({
    work: workProp,
    withIcon = false,
    btnText,
}) => {
    const { openModal } = useModalContext()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [work, setWork] = useStartWorkStore((store) => store)

    const handleClick = (e: React.MouseEvent) => {
        openModal(e)
        setWork(workProp)
    }

    return (
        <Button onClick={handleClick} data-modal-type={'startWorkModal'}>
            <Stack direction="row" alignItems={'center'} spacing={1}>
                {withIcon && (
                    <WorkStatusIcon workIsBusy={workProp.isWorkInProgress} />
                )}
                <Typography>{btnText}</Typography>
            </Stack>
        </Button>
    )
}
