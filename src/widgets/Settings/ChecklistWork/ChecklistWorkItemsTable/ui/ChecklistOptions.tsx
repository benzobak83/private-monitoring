import { Stack } from '@mui/material'
import { FC } from 'react'
import {
    AnswerOption,
    TChecklistAnswerOption,
} from '@entities/Settings/ChecklistWork'

type ChecklistOptionsProps = {
    options: TChecklistAnswerOption[]
}

export const ChecklistOptions: FC<ChecklistOptionsProps> = ({ options }) => {
    return (
        <Stack spacing={0.5} mt={0.5} mb={0.5}>
            {options.map((option) => {
                return <AnswerOption key={option.id} answerOption={option} />
            })}
        </Stack>
    )
}
