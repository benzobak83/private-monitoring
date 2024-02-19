import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $operatingTimeLogListTableData,
    getOperatingTimeLogListTableDataFx,
    resetOperatingTimeLogListTableData,
} from '@entities/Equipment'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const OperatingTimeTable: FC = () => {
    const operatingTimeLogListTableData = useStore(
        $operatingTimeLogListTableData
    )
    const getOperatingTimeLogListTableDataFxIsLoading = useStore(
        getOperatingTimeLogListTableDataFx.pending
    )

    const { id } = useDefaultParams()

    useEffect(() => {
        getOperatingTimeLogListTableDataFx({
            data: withDefaultTableParams(),
            id,
        })
    }, [id])

    useEffect(() => {
        return () => {
            resetOperatingTimeLogListTableData()
        }
    }, [])
    return (
        <MyStyledDataGrid
            rows={operatingTimeLogListTableData.rows}
            columns={columns}
            loading={getOperatingTimeLogListTableDataFxIsLoading}
            sx={{ height: '26vh' }}
        />
    )
}
