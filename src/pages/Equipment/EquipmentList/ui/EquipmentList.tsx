import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { EquipmentFilter } from '@/widgets/Equipment/EquipmentFilter'
import { EquipmentTable } from '@/widgets/Equipment/EquipmentTable'
import { $filter } from '@entities/Filter'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Оборудование', link: ROUTES.equipment.general },
]

const EquipmentList: FC = () => {
    const equipmentFilter = useStoreMap($filter, (store) => store.equipment)
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <EquipmentFilter />
            <EquipmentTable filter={equipmentFilter} />
        </Box>
    )
}

export default EquipmentList
