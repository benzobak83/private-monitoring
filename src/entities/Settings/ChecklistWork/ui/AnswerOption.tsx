import { Chip, SxProps, Theme } from '@mui/material'
import { FC, useMemo } from 'react'
import { TChecklistAnswerOption } from '../model/types'

type AnswerOptionProps = {
    answerOption: TChecklistAnswerOption
    sx?: SxProps<Theme>
}

export const AnswerOption: FC<AnswerOptionProps> = ({ answerOption, sx }) => {
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
    return (
        <Chip
            label={answerOption.name}
            color="default"
            sx={chipSx}
            size={'small'}
        />
    )
}
