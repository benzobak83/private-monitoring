import { Stack } from '@mui/material'
import { FC } from 'react'
import { TChecklistItems } from '../model/types'
import { ChecklistItemWithAnswersOptions } from './ChecklistItemWithAnswersOptions'

type ChecklistItemWithAnswersOptionsListProps = {
    checklistItems: TChecklistItems[]
}

export const ChecklistItemWithAnswersOptionsList: FC<
    ChecklistItemWithAnswersOptionsListProps
> = ({ checklistItems }) => {
    //TODO: delete any type after change from back
    return (
        <Stack spacing={1}>
            {checklistItems?.map((checklistItem, i) => {
                return (
                    <ChecklistItemWithAnswersOptions
                        key={i}
                        checklistItem={checklistItem as any}
                        index={i}
                    />
                )
            })}
        </Stack>
    )
}
