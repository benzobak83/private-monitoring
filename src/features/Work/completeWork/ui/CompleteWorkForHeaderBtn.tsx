import StopCircleIcon from '@mui/icons-material/StopCircle'
import { Chip, Stack, Tooltip, IconButton } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { $currentWork } from '@entities/Work'
import { transformTimeToSeconds } from '@shared/lib/helpers/transformTimeToSeconds'
import { useModal } from '@shared/lib/hooks/useModal'
import { hoverOpacitySx } from '@shared/sx'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { Stopwatch } from '@shared/ui/Stopwatch/Stopwatch'
import { CompleteWorkForm } from './CompleteWorkForm'

const initModals = {
    completeWorkModal: false,
}

export const CompleteWorkForHeaderBtn: FC = () => {
    const { registerModal, registerTrigger } = useModal(initModals)
    const work = useStore($currentWork)
    return (
        <>
            <Chip
                label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Stopwatch
                            currentTime={transformTimeToSeconds(
                                work.duration,
                                'HH:MM'
                            )}
                        />
                        <Tooltip title="Завершить смену">
                            <IconButton
                                {...registerTrigger('completeWorkModal')}
                            >
                                <StopCircleIcon
                                    color="warning"
                                    sx={hoverOpacitySx}
                                />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                }
            />

            <MyModal
                title="Завершение смены"
                {...registerModal('completeWorkModal')}
            >
                <CompleteWorkForm work={work} />
            </MyModal>
        </>
    )
}
