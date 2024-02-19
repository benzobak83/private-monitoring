import { Typography } from '@mui/material'
import { FC } from 'react'
import { StateCheckIds } from '@entities/Check'
import { errorColor } from '@shared/styles/variables/_export.module.scss'
import { TAnyFunc } from '@shared/types/Global'
import { ViewInspectionBtn } from '../..'
import { CompleteInspectionBtn } from './CompleteInspectionBtn'

export type CompleteInspectionCheckCellProps = {
    state?: StateCheckIds
    dateChecked?: string
    checkId: number
    checklistId: number
    cbAfterComplete?: TAnyFunc
}

export const CompleteInspectionCheckCell: FC<
    CompleteInspectionCheckCellProps
> = ({ state, dateChecked, checkId, checklistId, cbAfterComplete }) => {
    if (state === StateCheckIds.NEW) {
        return (
            <CompleteInspectionBtn
                variantBtn="outlined"
                cbAfterComplete={cbAfterComplete}
                checkId={checkId}
                checklistId={checklistId}
            />
        )
    }
    if (state === StateCheckIds.NOT_COMPLETED) {
        return <Typography color={errorColor}>Не выполнен</Typography>
    }
    if (state === StateCheckIds.COMPLETED && dateChecked) {
        return <ViewInspectionBtn btnText={dateChecked} checkId={checkId} />
    }

    return null
}
