import { Box } from '@mui/material'
import { FC } from 'react'
import { StartWorkFilter } from '@/widgets/Work/StartWorkFilter'
import { StartWorkTable } from '@/widgets/Work/StartWorkTable'
import { StartWorkProvider } from '@entities/Work'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'
import { Notification } from './Notification'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Мои смены', link: ROUTES.work.general },
    { id: 2, label: 'Начать смену (выбор объекта)', link: ROUTES.work.start },
]

const StartWork: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <Box mt={1}>
                <StartWorkFilter />
                <StartWorkProvider>
                    <StartWorkTable />
                </StartWorkProvider>
                <Notification />
            </Box>
        </Box>
    )
}

export default StartWork
