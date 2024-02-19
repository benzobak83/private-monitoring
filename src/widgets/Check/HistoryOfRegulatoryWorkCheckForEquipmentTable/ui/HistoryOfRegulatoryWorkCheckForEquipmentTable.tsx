import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { CheckModel } from '@entities/Check'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const HistoryOfRegulatoryWorkCheckForEquipmentTable: FC = () => {
    const historyOfRegulatoryWorkCheckForEquipmentTableData = useStore(
        CheckModel.$historyOfRegulatoryWorkCheckForEquipmentTableData
    )
    const getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFxIsLoading =
        useStore(
            CheckModel.getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx
                .pending
        )

    const { id } = useDefaultParams()

    useEffect(() => {
        CheckModel.getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx({
            data: withDefaultTableParams(),
            id,
        })
    }, [id])

    return (
        <MyStyledDataGrid
            rows={historyOfRegulatoryWorkCheckForEquipmentTableData.rows}
            columns={columns}
            loading={
                getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFxIsLoading
            }
            sx={{ height: '26vh' }}
        />
    )
}
