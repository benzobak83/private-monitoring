import { Stack, Typography, Box } from '@mui/material'
import { FormControl, RadioGroup } from '@mui/material'
import { useCallback, useEffect, useId, FC } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { greyColor } from '@shared/styles/variables/_export.module.scss'
import { errorColor } from '@shared/styles/variables/_export.module.scss'
import { TErrorMessage } from '@shared/types/Form'
import { TAnyFunc } from '@shared/types/Global'
import { TChecklistAnswerOption, TChecklistItems } from '../model/types'

const getBoxSx = (isPicked: boolean) => {
    return {
        flex: '1 1 100%',
        textAlign: 'center',
        padding: '2px 5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isPicked ? greyColor : 'none',
        border: `2px solid ${greyColor}`,
        color: 'black',
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: greyColor,
        },
        borderRadius: '5px',
        cursor: 'pointer',
    }
}

type WorkAnswerPickerProps = {
    checklistItem: TChecklistItems
    name: string
    checklistItemName: string
    defaultValue?: number
    getOptionLabel?: TAnyFunc
    helperText?: TErrorMessage
    index: number
}

export const WorkAnswerPicker: FC<WorkAnswerPickerProps> = ({
    name,
    checklistItem,
    checklistItemName,
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
            setValue(checklistItemName, Number(checklistItem.id))
        },
        [setValue, name, checklistItemName, checklistItem]
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
            <FormControl>
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
                                sx={getBoxSx(value === option.id)}
                                onClick={() => handleClick(option)}
                            >
                                <Typography>
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
