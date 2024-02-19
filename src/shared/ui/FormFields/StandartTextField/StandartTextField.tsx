import {
    Box,
    StandardTextFieldProps,
    SxProps,
    TextField,
    Theme,
} from '@mui/material'
import { FC, memo, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { TErrorMessage } from '../../../types/Form'
import { RequiredSymbol } from '../RequiredSymbol/RequiredSymbol'

export type IStandartTextFieldProps = {
    helperText?: TErrorMessage
    required?: boolean
    name: string
    validate?: (val: string | number) => boolean
    defaultValue?: string | number | null
    label: string
    clearFormFieldAfterUnmount?: boolean
    onChange?: (val: string | number) => any
    sx?: SxProps<Theme>
} & Omit<StandardTextFieldProps, 'helperText' | 'onChange'>

export const StandartTextField: FC<IStandartTextFieldProps> = memo(
    ({
        helperText,
        required,
        name,
        validate,
        defaultValue,
        label,
        onChange: onChangeFromProps,
        clearFormFieldAfterUnmount = true,
        sx,
        ...props
    }) => {
        const { setValue, control } = useFormContext()

        const value = useWatch({ control, name })

        const handleChange = (
            e: any,
            value: string | number,
            onChange: (...e: any[]) => void
        ) => {
            if (validate && !validate(e.target.value)) {
                return
            }

            const currentValue =
                props.type === 'number' ? +e.target.value : e.target.value

            onChange(currentValue)

            if (onChangeFromProps) {
                onChangeFromProps(currentValue)
            }
        }

        useEffect(() => {
            console.log('defaultValue - ', defaultValue)
            setValue(name, defaultValue)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue])

        useEffect(() => {
            return () => {
                if (clearFormFieldAfterUnmount) {
                    setValue(name, undefined)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return (
            <Box sx={{ width: '100%', position: 'relative' }}>
                {required && <RequiredSymbol />}
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange } }) => {
                        console.log('value - ', value)
                        return (
                            <TextField
                                value={value || ''}
                                onChange={(e) =>
                                    handleChange(e, value, onChange)
                                }
                                fullWidth
                                size={'small'}
                                label={label}
                                defaultValue={defaultValue}
                                error={!!helperText}
                                helperText={helperText as string}
                                sx={sx}
                                {...props}
                            />
                        )
                    }}
                />
            </Box>
        )
    }
)
