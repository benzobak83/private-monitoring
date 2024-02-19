import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { TCheck } from '@entities/Check'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columnsOfListOfNotCompletedWorks } from '../lib/columnsOfListOfNotCompletedWorks'

type ListOfNotCompletedWorksProps = {
    label?: string
    unfinishedTasks: TCheck[]
}

export const ListOfNotCompletedWorks: FC<ListOfNotCompletedWorksProps> = ({
    label,
    unfinishedTasks,
}) => {
    return (
        <Stack spacing={1}>
            {label && <Typography variant="h6">{label}</Typography>}
            <MyStyledDataGrid
                columns={columnsOfListOfNotCompletedWorks}
                height="50vh"
                rows={unfinishedTasks}
            />
        </Stack>
    )
}
