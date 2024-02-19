import { Box } from '@mui/material'
import { FC } from 'react'
import { WorkFilter } from '@/widgets/Work/WorkFilter'
import { WorkStatus } from '@/widgets/Work/WorkStatus'
import { WorkTable } from '@/widgets/Work/WorkTable'
import { StartWorkProvider } from '@entities/Work'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Мои смены', link: ROUTES.work.general },
]

const Work: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <Box mt={1}>
                <WorkStatus />
                <WorkFilter />
                <StartWorkProvider>
                    <WorkTable />
                </StartWorkProvider>
            </Box>
        </Box>
    )
}
export default Work
