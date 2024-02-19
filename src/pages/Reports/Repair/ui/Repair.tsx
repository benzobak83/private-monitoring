import { Box } from '@mui/material'
import { FC } from 'react'
import { RepairFilter } from '@/widgets/Report/RepairFilter'
import { RepairTable } from '@/widgets/Report/RepairTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Отчёты', link: ROUTES.report.repair },
]

const Repair: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <RepairFilter />

            <RepairTable />
        </Box>
    )
}

export default Repair
