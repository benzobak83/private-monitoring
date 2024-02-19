import { Box } from '@mui/material'
import { FC } from 'react'
import { JournalOfInspectionCheckFilter } from '@/widgets/Check/JournalOfInspectionCheckFilter'
import { JournalOfInspectionCheckTable } from '@/widgets/Check/JournalOfInspectionCheckTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Журналы', link: ROUTES.journal.general },
    {
        id: 1,
        label: 'Проверка оборудования',
        link: ROUTES.journal.inspectionCheck,
    },
]

const InspectionCheck: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <JournalOfInspectionCheckFilter />
            <JournalOfInspectionCheckTable />
        </Box>
    )
}

export default InspectionCheck
