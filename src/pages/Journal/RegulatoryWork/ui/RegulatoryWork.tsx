import { Box } from '@mui/material'
import { FC } from 'react'
import { JournalOfRegulatoryWorkFilter } from '@/widgets/Check/JournalOfRegulatoryWorkFilter'
import { JournalOfRegulatoryWorkTable } from '@/widgets/Check/JournalOfRegulatoryWorkTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Журналы', link: ROUTES.journal.general },
    {
        id: 1,
        label: 'Регламентные работы',
        link: ROUTES.journal.regulatoryWork,
    },
]

const RegulatoryWork: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <JournalOfRegulatoryWorkFilter />
            <JournalOfRegulatoryWorkTable />
        </Box>
    )
}

export default RegulatoryWork
