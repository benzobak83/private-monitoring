import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { CheckModel } from '@entities/Check'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const HistoryOfInspectionCheckForEquipmentTable: FC = () => {
    const historyOfInspectionCheckForEquipmentTableData = useStore(
        CheckModel.$historyOfInspectionCheckForEquipmentTableData
    )
    const getHistoryOfInspectionCheckForEquipmentTableDataFxIsLoading =
        useStore(
            CheckModel.getHistoryOfInspectionCheckForEquipmentTableDataFx
                .pending
        )

    const { id } = useDefaultParams()

    useEffect(() => {
        CheckModel.getHistoryOfInspectionCheckForEquipmentTableDataFx({
            data: withDefaultTableParams(),
            id,
        })
    }, [id])
    return (
        <>
            <MyStyledDataGrid
                rows={historyOfInspectionCheckForEquipmentTableData.rows}
                loading={
                    getHistoryOfInspectionCheckForEquipmentTableDataFxIsLoading
                }
                columns={columns}
                height="26vh"
            />
        </>
    )
}
