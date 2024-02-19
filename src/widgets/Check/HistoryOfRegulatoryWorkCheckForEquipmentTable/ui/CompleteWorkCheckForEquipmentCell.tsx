import { FC } from 'react'
import { CompleteWorkCheckCell } from '@/features/Check/completeCheck'
import { THistoryOfRegulatoryWorkCheckForEquipmentListItem } from '@entities/Check'
import { getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx } from '@entities/Check/model'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'

type CompleteWorkCheckForEquipmentCellProps = {
    row: THistoryOfRegulatoryWorkCheckForEquipmentListItem
}

export const CompleteWorkCheckForEquipmentCell: FC<
    CompleteWorkCheckForEquipmentCellProps
> = ({ row }) => {
    const { id } = useDefaultParams()
    return (
        <CompleteWorkCheckCell
            state={row.state?.id}
            checkId={row.id}
            dateChecked={row.dateChecked}
            checklistId={row.checklist.id}
            cbAfterComplete={() =>
                getHistoryOfRegulatoryWorkCheckForEquipmentTableDataFx({
                    id,
                    data: withDefaultTableParams(),
                })
            }
        />
    )
}
