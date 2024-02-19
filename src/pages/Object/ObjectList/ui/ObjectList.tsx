import { Box } from '@mui/material'
import { FC } from 'react'
import { ObjectFilter } from '@/widgets/Object/ObjectFilter'
import { ObjectTable } from '@/widgets/Object/ObjectTable'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Объекты', link: ROUTES.object.general },
]

const ObjectList: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <ObjectFilter />
            <ObjectTable />
        </Box>
    )
}
export default ObjectList
