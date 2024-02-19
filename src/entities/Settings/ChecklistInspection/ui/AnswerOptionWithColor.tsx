import { Chip, SxProps, Theme } from '@mui/material'
import { FC, useMemo } from 'react'
import { ChecklistTypeAnswer } from '../model/types'
import { TChecklistAnswerOption } from '../model/types'

type AnswerOptionWithColorProps = {
    answerOption: TChecklistAnswerOption
    sx?: SxProps<Theme>
}

export const AnswerOptionWithColor: FC<AnswerOptionWithColorProps> = ({
    answerOption,
    sx,
}) => {
    const chipSx = useMemo(() => {
        return {
            width: '200px',
            height: 'fit-content',
            padding: '3px',
            '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
            },
            ...sx,
        }
    }, [sx])
    switch (answerOption.typeAnswer) {
        case ChecklistTypeAnswer.OK:
            return (
                <Chip
                    label={answerOption.name}
                    color={'success'}
                    sx={chipSx}
                    size={'small'}
                />
            )

        case ChecklistTypeAnswer.NEGATIVE:
            return (
                <Chip
                    label={answerOption.name}
                    color={'error'}
                    sx={chipSx}
                    size={'small'}
                />
            )

        case ChecklistTypeAnswer.WARNING:
            return (
                <Chip
                    label={answerOption.name}
                    color={'warning'}
                    sx={chipSx}
                    size={'small'}
                />
            )

        default:
            return null
    }
}
