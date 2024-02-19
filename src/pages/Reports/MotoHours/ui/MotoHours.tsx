import { Box } from '@mui/material'
import { FC } from 'react'
import { MotoHourseFilter } from '@/widgets/Report/MotoHourseFilter'
import { MotoHourseTable } from '@/widgets/Report/MotoHourseTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Отчёты', link: ROUTES.report.general },
]

const MotoHours: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <MotoHourseFilter />
            <MotoHourseTable />
        </Box>
    )
}

export default MotoHours
