import { Button, Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $officialsTableData,
    getOfficialsTableDataFx,
} from '@entities/Settings/Officials'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { NotificationEmployeeSelect } from '../../components/NotificationEmployeeSelect'
import { columns } from '../../lib/columns'

export const OfficialsTable: FC = () => {
    const officialsTableData = useStore($officialsTableData)
    const getOfficialsTableDataFxIsPending = useStore(
        getOfficialsTableDataFx.pending
    )

    return (
        <Stack sx={{ width: 'fit-content' }} spacing={2}>
            <MyStyledDataGrid
                rows={officialsTableData.rows || []}
                columns={columns}
                loading={getOfficialsTableDataFxIsPending}
                sx={{ width: 'fit-content' }}
            />

            <NotificationEmployeeSelect />

            <Divider />

            <Button
                variant="contained"
                color="success"
                form="editOfficialsForm"
                type="submit"
            >
                Сохранить
            </Button>
        </Stack>
    )
}
