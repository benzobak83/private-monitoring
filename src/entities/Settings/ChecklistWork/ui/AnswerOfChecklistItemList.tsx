import { Stack } from '@mui/material'
import { FC } from 'react'
import { TChecklistItems } from '../model/types'
import { AnswerOfChecklistItem } from './AnswerOfChecklistItem'

type AnswerOfChecklistItemListProps = {
    checklistItems: TChecklistItems[]
}

export const AnswerOfChecklistItemList: FC<AnswerOfChecklistItemListProps> = ({
    checklistItems,
}) => {
    return (
        <Stack spacing={1}>
            {checklistItems.map((item, i) => {
                return (
                    <AnswerOfChecklistItem
                        key={i}
                        checklistItem={item}
                        index={i}
                    />
                )
            })}
        </Stack>
    )
}
