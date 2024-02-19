import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Box,
    Typography,
} from '@mui/material'
import { useCallback, useEffect, useId } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TErrorMessage } from '@shared/types/Form'
import { TAnyFunc } from '@shared/types/Global'
import { getColorByTypeAnswer } from '../lib/getColorByTypeAnswer'

export type StandartRadioColorProps = {
    label?: string
    name: string
    row?: boolean
    required?: boolean
    size?: boolean
    defaultValue?: string | number | null
    getOptionLabel?: TAnyFunc
    handleChange?: (value: string) => void
    disabled?: boolean
    helperText?: TErrorMessage
    getOptionValue?: TAnyFunc
    options: Record<string, unknown>[]
}

export const StandartRadioColor = ({
    label,
    name,
    row = false,
    options = [],
    handleChange,
    helperText,
    disabled,
    required = false,
    defaultValue,
    getOptionLabel = (option: any) => option.label,
    getOptionValue = (option: any) => option.id,
}: StandartRadioColorProps) => {
    const id = useId()

    const { setValue } = useFormContext()

    const value = useWatch({ name })

    const handleChangeValue = useCallback(
        (value: string) => {
            if (value === undefined) {
                return setValue(name, undefined)
            }

            setValue(name, +value)
            handleChange && handleChange(value)
        },
        [setValue, handleChange, name]
    )

    useEffect(() => {
        if (typeof defaultValue === 'undefined') return

        setValue(name, defaultValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

    return (
        <FormControl error={!!helperText} disabled={disabled}>
            <FormLabel id={id} sx={{ textAlign: 'left' }}>
                {label}
            </FormLabel>
            <RadioGroup
                row={row}
                name={name}
                value={value ?? ''}
                defaultValue={defaultValue}
                aria-labelledby={id}
                onChange={(e: any) => handleChangeValue(e.target.value)}
            >
                {options.map((option: any, index: number) => (
                    <Box key={index}>
                        <FormControlLabel
                            value={getOptionValue(option)}
                            control={
                                <Radio
                                    size="small"
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fill: 'transparent',

                                            backgroundColor:
                                                getColorByTypeAnswer(option.id),
                                            borderRadius: '10px',
                                            zIndex: 10,
                                        },

                                        '& .MuiSvgIcon-root > path': {
                                            fill:
                                                value === option.id
                                                    ? 'white'
                                                    : 'transparent',
                                        },
                                    }}
                                />
                            }
                            label={getOptionLabel(option)}
                            required={required}
                        />
                        {value !== option.id && option.value && (
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 100,
                                    color: 'white',
                                }}
                            >
                                {option.value}
                            </Typography>
                        )}
                    </Box>
                ))}
            </RadioGroup>
            {!!helperText && (
                <FormHelperText>{helperText as string}</FormHelperText>
            )}
        </FormControl>
    )
}
