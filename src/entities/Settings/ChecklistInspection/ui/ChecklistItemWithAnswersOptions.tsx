import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { getColorByTypeAnswer } from '../lib/getColorByTypeAnswer'
import { ChecklistTypeAnswer, TChecklistItems } from '../model/types'

const boxSx = { textAlign: 'center', padding: '2px 5px' }

const getSx = ({
    typeAnswer,
    isLastItem,
    isAnswer,
    resultColor,
}: {
    typeAnswer: ChecklistTypeAnswer
    isLastItem: boolean
    isAnswer: boolean
    resultColor: string
}) => {
    console.log(
        'typeAnswerisLastItemisAnswerresultColor - ',
        typeAnswer,
        isLastItem,
        isAnswer,
        resultColor
    )
    const colorByTypeAnswer = getColorByTypeAnswer(typeAnswer)
    return {
        ...boxSx,
        backgroundColor: isAnswer ? colorByTypeAnswer : 'none',
        width: '100%',
        fontWeight: 'medium',
        borderRight: !isLastItem ? `1px solid ${resultColor}` : 'none',
        color: isAnswer ? 'white' : colorByTypeAnswer,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }
}

type ChecklistItemWithAnswersOptionsProps = {
    index: number
    checklistItem: TChecklistItems
}

export const ChecklistItemWithAnswersOptions: FC<
    ChecklistItemWithAnswersOptionsProps
> = ({ index, checklistItem }) => {
    const resultAnswer = checklistItem?.answerOptions?.find(
        (answer) => answer.isAnswerResult
    )
    const resultColor = getColorByTypeAnswer(
        resultAnswer?.typeAnswer as ChecklistTypeAnswer
    )
    return (
        <Stack
            sx={{
                border: `1px solid ${resultColor}`,
                borderRadius: '5px',
                overflow: 'auto',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    ...boxSx,
                    textAlign: 'left',
                    borderBottom: `1px solid ${resultColor}`,
                }}
            >
                {index + 1}. {checklistItem.name}
            </Typography>
            <Stack direction="row">
                {checklistItem?.answerOptions?.map((answer, i) => (
                    <Typography
                        key={answer.id}
                        sx={getSx({
                            typeAnswer: answer.typeAnswer,
                            isLastItem:
                                i + 1 === checklistItem?.answerOptions?.length,
                            isAnswer: answer.isAnswerResult || false,
                            resultColor,
                        })}
                    >
                        {answer.name}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    )
}
