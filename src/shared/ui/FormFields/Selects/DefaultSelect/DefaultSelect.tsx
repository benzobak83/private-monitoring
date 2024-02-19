import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectProps,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { memo, useCallback, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TErrorMessage } from '../../../../types/Form'
import { TAnyFunc } from '../../../../types/Global'
import { RequiredSymbol } from '../../../../ui/FormFields/RequiredSymbol/RequiredSymbol'

export type DefaultSelectProps = {
    label: string
    name: string
    disabledOption?: (...args: any) => any
    required?: boolean
    empty?: boolean
    defaultValue?: number | boolean | null
    getOptionLabel?: TAnyFunc
    handleChange?: TAnyFunc
    nullable?: boolean
    helperText?: TErrorMessage
    getOptionValue?: TAnyFunc
    options: any
} & Omit<SelectProps, 'helperText'>

export const DefaultSelect = memo(
    ({
        label,
        defaultValue,
        empty = true,
        name,
        getOptionLabel = (val) => val.label,
        getOptionValue = (val) => val.id,
        handleChange,
        options = [],
        required = false,
        disabledOption,
        helperText,
        ...props
    }: DefaultSelectProps) => {
        const { register, setValue } = useFormContext()

        const value = useWatch({ name })

        const labelId = useId()

        const handleChangeValue = useCallback(
            (value: any) => () => {
                if (value === undefined) {
                    return setValue(name, undefined)
                }

                setValue(name, getOptionValue(value))
            },
            [getOptionValue, name, setValue]
        )

        useEffect(() => {
            setValue(name, defaultValue)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue])

        useEffect(() => {
            return () => {
                setValue(name, undefined)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <FormControl fullWidth size="small" error={!!helperText}>
                {required && <RequiredSymbol />}
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    {...(props as any)}
                    {...register(name)}
                    onChange={handleChange || undefined}
                    fullWidth
                    sx={{ textAlign: 'left' }}
                    value={value ?? ''}
                    size="small"
                    label={label}
                    labelId={labelId}
                >
                    {empty && (
                        <MenuItem
                            value={undefined}
                            onClick={handleChangeValue(undefined)}
                        >
                            Не выбрано
                        </MenuItem>
                    )}
                    {options.map((item: any, i: number) => (
                        <MenuItem
                            key={item?.id || i}
                            value={getOptionValue(item)}
                            disabled={
                                disabledOption ? disabledOption(item) : false
                            }
                            onClick={handleChangeValue(item)}
                        >
                            {getOptionLabel(item)}
                        </MenuItem>
                    ))}
                </Select>
                {!!helperText && (
                    <FormHelperText>{helperText as string}</FormHelperText>
                )}
            </FormControl>
        )
    }
)
