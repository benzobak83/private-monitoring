import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $subdivisionTableData,
    getSubdivisionTableDataFx,
} from '@entities/Settings/Subdivision'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const SubdivisionTable: FC = () => {
    const subdivisionTableData = useStore($subdivisionTableData)
    const getSubdivisionTableDataFxIsPending = useStore(
        getSubdivisionTableDataFx.pending
    )

    useEffect(() => {
        getSubdivisionTableDataFx()
    }, [])

    return (
        <MyStyledDataGrid
            rows={subdivisionTableData.rows || []}
            columns={columns}
            loading={getSubdivisionTableDataFxIsPending}
        />
    )
}
