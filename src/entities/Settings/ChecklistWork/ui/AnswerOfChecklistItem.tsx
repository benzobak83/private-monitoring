import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { greyColor } from '@shared/styles/variables/_export.module.scss'
import { TChecklistItems } from '../model/types'

const boxSx = { textAlign: 'center', padding: '2px 5px' }

const getSx = ({
    isLastItem,
    isAnswer,
}: {
    isLastItem: boolean
    isAnswer: boolean
}) => {
    return {
        ...boxSx,
        backgroundColor: isAnswer ? greyColor : 'none',
        width: '100%',
        borderRight: !isLastItem ? `1px solid ${greyColor}` : 'none',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }
}

type AnswerOfChecklistItemProps = {
    index: number
    checklistItem: TChecklistItems
}

export const AnswerOfChecklistItem: FC<AnswerOfChecklistItemProps> = ({
    index,
    checklistItem,
}) => {
    return (
        <Stack
            sx={{
                border: `1px solid ${greyColor}`,
                borderRadius: '5px',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    ...boxSx,
                    textAlign: 'left',
                    borderBottom: `1px solid ${greyColor}`,
                }}
            >
                {index + 1}. {checklistItem.name}
            </Typography>
            <Stack direction="row">
                {checklistItem?.answerOptions?.map((answer, i) => (
                    <Typography
                        key={answer.id}
                        sx={getSx({
                            isLastItem:
                                i + 1 === checklistItem?.answerOptions?.length,
                            isAnswer: !!answer.isAnswerResult,
                        })}
                    >
                        {answer.name}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    )
}
