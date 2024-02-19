import { Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { CompleteWorkBtn } from '@/features/Work/completeWork'
import { $objectItem } from '@entities/Object'
import { reloadWorkListOfObjectTableData } from '@entities/Work/model/getWorkOfObjectList'
import { TWorkOfObject } from '@entities/Work/model/types'

type DeadlineCellProps = {
    row: TWorkOfObject
}

export const DeadlineCell: FC<DeadlineCellProps> = ({ row }) => {
    const object = useStore($objectItem)

    const cbAfterQuery = () => {
        reloadWorkListOfObjectTableData()
    }
    return (
        <>
            {row.isWorkInProgress ? (
                <CompleteWorkBtn
                    work={row}
                    workName={object.name}
                    cbAfterQuery={cbAfterQuery}
                />
            ) : (
                <Typography>{row.dateEnd}</Typography>
            )}
        </>
    )
}
