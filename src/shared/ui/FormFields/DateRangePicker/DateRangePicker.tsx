import { Stack, StandardTextFieldProps, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { TErrorMessage } from '../../../types/Form'
import { TRange } from '../../../types/Global'
import { MyDatePicker } from '../DatePicker/DatePicker'

export type DatePickerProps = {
    nameFrom: string
    nameTo: string
    labelFrom?: string
    labelTo?: string
    dateFormat?: string
    defaultValue?: TRange<Date | null>
    helperTextFrom?: TErrorMessage
    helperTextTo?: TErrorMessage
} & Omit<StandardTextFieldProps, 'helperText'>

export const MyDateRangePicker: FC<DatePickerProps> = memo(
    ({
        nameFrom,
        nameTo,
        labelFrom = 'Период от',
        labelTo = 'Период до',
        defaultValue = null,
        helperTextFrom,
        helperTextTo,
    }) => {
        return (
            <Stack
                direction={'row'}
                spacing={1}
                sx={{ width: '100%' }}
                alignItems="center"
            >
                <MyDatePicker
                    name={nameFrom}
                    helperText={helperTextFrom}
                    label={labelFrom}
                    defaultValue={defaultValue?.from}
                />
                <Typography>-</Typography>
                <MyDatePicker
                    name={nameTo}
                    helperText={helperTextTo}
                    label={labelTo}
                    defaultValue={defaultValue?.to}
                />
            </Stack>
        )
    }
)
