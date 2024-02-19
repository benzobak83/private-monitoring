import { Box } from '@mui/material'
import { FC } from 'react'
import { JournalOfOperatingTimeFilter } from '@/widgets/Equipment/JournalOfOperatingTimeFilter'
import { JournalOfOperatingTimeTable } from '@/widgets/Equipment/JournalOfOperatingTimeTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Журналы', link: ROUTES.journal.general },
    {
        id: 1,
        label: 'Наработка',
        link: ROUTES.journal.operatingTime,
    },
]

const OperatingTime: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <JournalOfOperatingTimeFilter />
            <JournalOfOperatingTimeTable />
        </Box>
    )
}
export default OperatingTime
