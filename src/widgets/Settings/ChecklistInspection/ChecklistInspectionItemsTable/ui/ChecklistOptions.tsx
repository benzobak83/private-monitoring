import { Stack } from '@mui/material'
import { FC } from 'react'
import {
    AnswerOptionWithColor,
    TChecklistAnswerOption,
} from '@entities/Settings/ChecklistInspection'

type ChecklistOptionsProps = {
    options: TChecklistAnswerOption[]
}

export const ChecklistOptions: FC<ChecklistOptionsProps> = ({ options }) => {
    return (
        <Stack spacing={0.5} mt={0.5} mb={0.5}>
            {options.map((option) => {
                return (
                    <AnswerOptionWithColor
                        key={option.id}
                        answerOption={option}
                    />
                )
            })}
        </Stack>
    )
}
