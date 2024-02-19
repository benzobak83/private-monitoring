import { Box, StandardTextFieldProps } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { dateFormatWithHoursAndMinutes } from '../../../lib/consts/date'
import { TErrorMessage } from '../../../types/Form'
import { RequiredSymbol } from '../RequiredSymbol/RequiredSymbol'

export type DatePickerWithTimeProps = {
    name: string
    dateFormat?: string
    defaultValue?: Date | null
    disabled?: boolean
    helperText?: TErrorMessage
} & Omit<StandardTextFieldProps, 'helperText'>

export const MyDatePickerWithTime: FC<DatePickerWithTimeProps> = memo(
    ({
        name,
        label,
        defaultValue = null,
        dateFormat = dateFormatWithHoursAndMinutes,
        helperText,
        required,
        disabled,
    }) => {
        const { register, setValue: setFormValue } = useFormContext()

        const [value, setValue] = useState<Date | null>(
            defaultValue ? new Date(defaultValue) : null
        )

        const onChange = useCallback(
            (newValue: Date | null) => {
                console.log('newValue - ', newValue)
                setValue(newValue)

                setFormValue(
                    name,
                    newValue ? format(newValue, dateFormat) : null
                )
            },
            [setValue, setFormValue, dateFormat, name]
        )

        useEffect(() => {
            if (!defaultValue) {
                return setFormValue(name, null)
            }

            setFormValue(name, format(defaultValue, dateFormat))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ru}
            >
                <Box sx={{ width: '100%', position: 'relative' }}>
                    {required && <RequiredSymbol />}
                    <DateTimePicker
                        {...register(name)}
                        label={label}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                size: 'small',
                                fullWidth: true,
                                helperText: helperText as string,
                                error: !!helperText,
                            },
                        }}
                    />
                </Box>
            </LocalizationProvider>
        )
    }
)
