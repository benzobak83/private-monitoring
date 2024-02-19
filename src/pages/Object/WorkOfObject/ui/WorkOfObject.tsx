import { Stack } from '@mui/material'
import { FC } from 'react'
import { WorkOfObjectFilter } from '@/widgets/Work/WorkOfObjectFilter'
import { WorkOfObjectTable } from '@/widgets/Work/WorkOfObjectTable'

const ShiftsOfObject: FC = () => {
    return (
        <Stack>
            <WorkOfObjectFilter />
            <WorkOfObjectTable />
        </Stack>
    )
}

export default ShiftsOfObject
