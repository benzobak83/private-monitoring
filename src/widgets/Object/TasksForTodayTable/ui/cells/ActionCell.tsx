import { FC } from 'react'
import {
    CompleteInspectionCheckCell,
    CompleteWorkCheckCell,
} from '@/features/Check/completeCheck'
import { StateCheckIds } from '@entities/Check'
import { ChecklistType } from '@entities/Settings/Checklist'
import { pingForReloadTasksForTodayTabledata } from '@entities/Task'

type ActionCellProps = {
    typeChecklist: ChecklistType
    state: StateCheckIds
    checkId: number
    checklistId: number
    dateChecked: string
}

export const ActionCell: FC<ActionCellProps> = ({
    typeChecklist,
    state,
    checkId,
    checklistId,
    dateChecked,
}) => {
    if (typeChecklist === ChecklistType.INSPECTION) {
        return (
            <CompleteInspectionCheckCell
                state={state}
                checkId={checkId}
                dateChecked={dateChecked}
                checklistId={checklistId}
                cbAfterComplete={pingForReloadTasksForTodayTabledata}
            />
        )
    }
    if (typeChecklist === ChecklistType.WORKS) {
        return (
            <CompleteWorkCheckCell
                state={state}
                dateChecked={dateChecked}
                checkId={checkId}
                checklistId={checklistId}
                cbAfterComplete={pingForReloadTasksForTodayTabledata}
            />
        )
    }

    return null
}
