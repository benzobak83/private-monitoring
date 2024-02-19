import { Stack } from '@mui/material'
import { FC } from 'react'
import { ChecklistItemWithAnswersOptionsList } from '@entities/Settings/ChecklistInspection'
import { TCheckOfHistory } from '../../model/types/types'
import { ResultOfCheckWithAuthor } from '../ResultOfCheckWithAuthor'

type ViewInspectionBlockProps = {
    check: TCheckOfHistory
}

export const ViewInspectionBlock: FC<ViewInspectionBlockProps> = ({
    check,
}) => {
    return (
        <Stack spacing={2} textAlign="left">
            <ChecklistItemWithAnswersOptionsList
                checklistItems={check?.checklist?.checklistItems}
            />
            <ResultOfCheckWithAuthor
                user={check?.user?.name}
                result={check?.result?.id}
            />
        </Stack>
    )
}
