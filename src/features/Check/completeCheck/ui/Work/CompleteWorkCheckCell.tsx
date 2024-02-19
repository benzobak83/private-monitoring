import { Typography } from '@mui/material'
import { FC } from 'react'
import { StateCheckIds } from '@entities/Check'
import { ViewWorkBtn } from '@entities/Check/ui/Work/ViewWorkBtn'
import { errorColor } from '@shared/styles/variables/_export.module.scss'
import { TAnyFunc } from '@shared/types/Global'
import { CompleteWorkBtn } from './CompleteWorkBtn'

type CompleteWorkCheckCellProps = {
    state?: StateCheckIds
    dateChecked?: string
    checkId: number
    checklistId: number
    cbAfterComplete?: TAnyFunc
}

export const CompleteWorkCheckCell: FC<CompleteWorkCheckCellProps> = ({
    state,
    dateChecked,
    checkId,
    checklistId,
    cbAfterComplete,
}) => {
    if (state === StateCheckIds.NEW) {
        return (
            <CompleteWorkBtn
                variantBtn="outlined"
                checkId={checkId}
                cbAfterComplete={cbAfterComplete}
                checklistId={checklistId}
            />
        )
    }
    if (state === StateCheckIds.NOT_COMPLETED) {
        return <Typography color={errorColor}>Не выполнен</Typography>
    }
    if (state === StateCheckIds.COMPLETED && dateChecked) {
        return <ViewWorkBtn btnText={dateChecked} checkId={checkId} />
    }

    return null
}
