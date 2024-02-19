import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'
import { $currentWork } from '../../../model/getCurrentWork'

type WorkStartedProps = {
    completeWorkBtnSlot: ReactNode
}

export const WorkStarted: FC<WorkStartedProps> = ({ completeWorkBtnSlot }) => {
    const work = useStore($currentWork)
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h3">Работа на объекте:</Typography>
                {completeWorkBtnSlot}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h3">Объект:</Typography>
                <Link to={ROUTES.object.cardGet(work?.object?.id)}>
                    <Typography variant="h3">{work?.object?.name}</Typography>
                </Link>
            </Stack>
        </Stack>
    )
}
