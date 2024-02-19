import { FC } from 'react'
import { CompleteInspectionCheckCell } from '@/features/Check/completeCheck'
import { THistoryOfInspectionCheckForEquipmentListItem } from '@entities/Check'
import { getHistoryOfInspectionCheckForEquipmentTableDataFx } from '@entities/Check/model'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'

type CompleteInspectionCheckForEquipmentCellProps = {
    row: THistoryOfInspectionCheckForEquipmentListItem
}

export const CompleteInspectionCheckForEquipmentCell: FC<
    CompleteInspectionCheckForEquipmentCellProps
> = ({ row }) => {
    const { id } = useDefaultParams()
    return (
        <CompleteInspectionCheckCell
            state={row.state?.id}
            checkId={row.id}
            dateChecked={row.dateChecked}
            checklistId={row.checklist.id}
            cbAfterComplete={() =>
                getHistoryOfInspectionCheckForEquipmentTableDataFx({
                    id,
                    data: withDefaultTableParams(),
                })
            }
        />
    )
}
