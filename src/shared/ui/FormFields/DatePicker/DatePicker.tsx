import { Box, StandardTextFieldProps } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { dateFormatBackend } from '../../../lib/consts/date'
import { TErrorMessage } from '../../../types/Form'
import { RequiredSymbol } from '../RequiredSymbol/RequiredSymbol'

export type DatePickerProps = {
    name: string
    dateFormat?: string
    defaultValue?: Date | null
    helperText?: TErrorMessage
} & Omit<StandardTextFieldProps, 'helperText'>

export const MyDatePicker: FC<DatePickerProps> = memo(
    ({
        name,
        label,
        defaultValue = null,
        dateFormat = dateFormatBackend,
        helperText,
        required,
        disabled,
    }) => {
        const { register, setValue: setFormValue, control } = useFormContext()

        const watchValue = useWatch({ control, name })

        const [value, setValue] = useState<Date | null>(
            defaultValue ? new Date(defaultValue) : null
        )

        const onChange = useCallback(
            (newValue: Date | null) => {
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

        useEffect(() => {
            setValue(watchValue ? new Date(watchValue) : null)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [watchValue])

        return (
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ru}
            >
                <Box sx={{ width: '100%', position: 'relative' }}>
                    {required && <RequiredSymbol />}
                    <DatePicker
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
