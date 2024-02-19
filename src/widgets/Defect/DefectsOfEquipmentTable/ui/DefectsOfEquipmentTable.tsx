import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import {
    $defectListOfEquipmentTableData,
    getDefectListOfEquipmentTableDataFx,
} from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const DefectsOfEquipmentTable: FC = () => {
    const defectListOfEquipmentTableData = useStore(
        $defectListOfEquipmentTableData
    )

    const { id } = useDefaultParams()

    useEffect(() => {
        getDefectListOfEquipmentTableDataFx(id)
    }, [id])
    return (
        <MyStyledDataGrid
            rows={defectListOfEquipmentTableData.rows}
            columns={columns}
            height="26vh"
        />
    )
}
