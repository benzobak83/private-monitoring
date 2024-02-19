import {
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { memo, useCallback, useEffect, useId } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TErrorMessage } from '../../../types/Form'
import { TAnyFunc } from '../../../types/Global'

export type StandartRadioProps = {
    label?: string
    name: string
    row?: boolean
    required?: boolean
    type?: 'string' | 'number' | 'boolean'
    defaultValue?: string | number | null | boolean | undefined
    getOptionLabel?: TAnyFunc
    handleChange?: (value: string) => void
    disabled?: boolean
    helperText?: TErrorMessage
    error?: boolean
    getOptionValue?: TAnyFunc
    divider?: boolean
    options: Record<string, unknown>[]
}

export const StandartRadio = memo(
    ({
        label,
        name,
        row = false,
        options = [],
        handleChange,
        helperText,
        error = false,
        divider,
        type = 'string',
        disabled,
        required = false,
        defaultValue,
        getOptionLabel = (option: any) => option.label,
        getOptionValue = (option: any) => option.id,
    }: StandartRadioProps) => {
        const id = useId()

        const { setValue } = useFormContext()

        const value = useWatch({ name })

        const handleChangeValue = useCallback(
            (value: string) => {
                setValue(name, type === 'number' ? Number(value) : value)
                handleChange && handleChange(value)
            },
            [setValue, handleChange, name, type]
        )

        useEffect(() => {
            setValue(name, defaultValue)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue])

        return (
            <FormControl error={!!helperText || error} disabled={disabled}>
                <FormLabel id={id} sx={{ textAlign: 'left' }}>
                    {label}
                </FormLabel>
                <RadioGroup
                    row={row}
                    name={name}
                    value={value ?? ''}
                    defaultValue={defaultValue}
                    aria-labelledby={id}
                    onChange={(e: any) =>
                        handleChangeValue(
                            type === 'boolean'
                                ? e.target.value === 'true'
                                : e.target.value
                        )
                    }
                >
                    {options.map((option: any, index: number) => (
                        <>
                            <FormControlLabel
                                key={index}
                                value={getOptionValue(option)}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '18px !important',
                                                minWidth: '20px !important',
                                            },
                                        }}
                                    />
                                }
                                label={getOptionLabel(option)}
                                required={required}
                            />
                            {divider && index !== options.length - 1 && (
                                <Divider
                                    flexItem
                                    sx={{ mt: '2px', mb: '2px' }}
                                />
                            )}
                        </>
                    ))}
                </RadioGroup>

                {!!helperText && (
                    <FormHelperText>{helperText as string}</FormHelperText>
                )}
            </FormControl>
        )
    }
)
