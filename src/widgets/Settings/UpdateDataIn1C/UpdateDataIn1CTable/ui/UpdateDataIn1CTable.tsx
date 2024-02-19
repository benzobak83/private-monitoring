import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $data1CTableData,
    getUpdatedDataIn1CListFx,
} from '@entities/Settings/UpdateDataIn1C'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const UpdateDataIn1CTable: FC = () => {
    const updateData1CTableData = useStore($data1CTableData)

    useEffect(() => {
        getUpdatedDataIn1CListFx()
    }, [])

    return (
        <Stack>
            <MyStyledDataGrid
                columns={columns}
                rows={updateData1CTableData?.rows}
            />
        </Stack>
    )
}
