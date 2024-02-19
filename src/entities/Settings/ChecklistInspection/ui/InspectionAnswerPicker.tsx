import { Stack, Typography, Box } from '@mui/material'
import { FormControl, RadioGroup } from '@mui/material'
import { useCallback, useEffect, useId, FC } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { errorColor } from '@shared/styles/variables/_export.module.scss'
import { TErrorMessage } from '@shared/types/Form'
import { TAnyFunc } from '@shared/types/Global'
import { getColorByTypeAnswer } from '../lib/getColorByTypeAnswer'
import { TChecklistAnswerOption, TChecklistItems } from '../model/types'

const getBoxSx = (option: TChecklistAnswerOption, isPicked: boolean) => {
    return {
        flex: '1 1 100%',
        textAlign: 'center',
        padding: '2px 5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isPicked
            ? getColorByTypeAnswer(option.typeAnswer)
            : 'none',
        border: `2px solid ${getColorByTypeAnswer(option.typeAnswer)}`,
        color: isPicked ? 'white' : 'black',
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: getColorByTypeAnswer(option.typeAnswer),
            color: 'white',
        },
        borderRadius: '5px',
        cursor: 'pointer',
    }
}

type InspectionAnswerPickerProps = {
    checklistItem: TChecklistItems
    name: string
    checklistItemName?: string
    defaultValue?: number
    writeTypeAnswer?: boolean
    helperText?: TErrorMessage
    getOptionLabel?: TAnyFunc
    index: number
}

export const InspectionAnswerPicker: FC<InspectionAnswerPickerProps> = ({
    name,
    checklistItem,
    checklistItemName,
    writeTypeAnswer,
    getOptionLabel = (option: any) => option.name,
    defaultValue,
    helperText,
    index,
}) => {
    const id = useId()
    const { setValue } = useFormContext()

    const ERROR_VALIDATION_MSG = helperText ? ' - ' + helperText : ''

    const value = useWatch({ name })

    const handleClick = useCallback(
        (answer: TChecklistAnswerOption) => {
            setValue(name, Number(answer.id))

            if (checklistItemName) {
                setValue(checklistItemName, Number(checklistItem.id))
            }
            if (writeTypeAnswer) {
                setValue(`answers.${index}.typeAnswers`, answer.typeAnswer)
            }
        },
        [
            setValue,
            name,
            checklistItemName,
            checklistItem.id,
            writeTypeAnswer,
            index,
        ]
    )

    useEffect(() => {
        setValue(name, defaultValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

    return (
        <Stack>
            <Box sx={{ textAlign: 'left' }} mb={1}>
                <Typography
                    variant="h6"
                    sx={{ color: helperText ? errorColor : 'black' }}
                >
                    {index + 1}. {checklistItem.name} {ERROR_VALIDATION_MSG}
                </Typography>
            </Box>
            <FormControl error={true}>
                <RadioGroup
                    row={true}
                    name={name}
                    value={value ?? ''}
                    defaultValue={defaultValue}
                    aria-labelledby={id}
                >
                    <Stack direction="row" sx={{ width: '100%' }} spacing={0.5}>
                        {checklistItem.answerOptions.map((option, index) => (
                            <Box
                                key={index}
                                sx={getBoxSx(option, value === option.id)}
                                onClick={() => handleClick(option)}
                            >
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {getOptionLabel(option)}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}
