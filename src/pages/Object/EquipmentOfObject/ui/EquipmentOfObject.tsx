import { Stack } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { EquipmentOfObjectFilter } from '@/widgets/Equipment/EquipmentOfObjectFilter'
import { EquipmentTable } from '@/widgets/Equipment/EquipmentTable'
import { $filter } from '@entities/Filter'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'

const EquipmentOfObject: FC = () => {
    const equipmentOfObjectFilter = useStoreMap(
        $filter,
        (store) => store.equipmentOfObject
    )

    const { id } = useDefaultParams()

    return (
        <Stack>
            <EquipmentOfObjectFilter />
            <EquipmentTable
                filter={equipmentOfObjectFilter}
                objectId={id}
                height="62vh"
            />
        </Stack>
    )
}

export default EquipmentOfObject
