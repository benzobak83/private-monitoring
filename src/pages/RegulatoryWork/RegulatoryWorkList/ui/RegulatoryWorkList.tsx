import { Box } from '@mui/material'
import { FC } from 'react'
import { RegulatoryWorkFilter } from '@/widgets/RegulatoryWork/RegulatoryWorkFilter'
import { RegulatoryWorkTable } from '@/widgets/RegulatoryWork/RegulatoryWorkTable'
import { RegulatoryWorkTableProvider } from '@entities/RegulatoryWork'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    {
        id: 1,
        label: 'Регламентные работы',
        link: ROUTES.regulatoryWork.general,
    },
]

const RegulatoryWorkList: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <RegulatoryWorkFilter />
            <RegulatoryWorkTableProvider>
                <RegulatoryWorkTable />
            </RegulatoryWorkTableProvider>
        </Box>
    )
}

export default RegulatoryWorkList
