import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from '@mui/material'
import { FC, memo, useEffect, useId } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { TErrorMessage } from '../../../types/Form'
import { TAnyFunc } from '../../../types/Global'

type TOption = Record<string, unknown>

type StandartCheckBoxProps = {
    label?: string
    name: string
    required?: boolean
    type?: 'string' | 'number' | 'boolean'
    defaultValue?: Array<number>
    getOptionLabel?: TAnyFunc
    handleChange?: (value: Array<number>) => void
    disabled?: boolean
    helperText?: TErrorMessage
    error?: boolean
    getOptionValue?: TAnyFunc
    options: TOption[]
}
export const StandartCheckBox: FC<StandartCheckBoxProps> = memo(
    ({
        label,
        name,
        options = [],
        helperText,
        error = false,
        defaultValue,
        getOptionLabel = (option: any) => option.label,
        getOptionValue = (option: any) => option.id,
    }) => {
        const id = useId()

        const { setValue, control } = useFormContext()
        const { remove, append } = useFieldArray({ control, name })

        const value: number[] = useWatch({ name, control }) || []

        useEffect(() => {
            setValue(name, defaultValue)
        }, [defaultValue, setValue, name])

        const handleClick = (isChecked: boolean, id: number) => {
            if (isChecked) {
                append(id)
            } else {
                const index = value.findIndex((option) => option === id)
                remove(index)
            }
        }

        return (
            <FormControl error={!!helperText || error}>
                <FormLabel id={id} sx={{ textAlign: 'left' }}>
                    {label}
                </FormLabel>
                <FormGroup aria-labelledby={id} sx={{ gap: -1 }}>
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={(option?.id as number) || index}
                            onChange={(_, checked) =>
                                handleClick(checked, getOptionValue(option))
                            }
                            value={option.id}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={value.includes(
                                        getOptionValue(option)
                                    )}
                                />
                            }
                            label={getOptionLabel(option)}
                        />
                    ))}
                </FormGroup>
                {!!helperText && (
                    <FormHelperText>{helperText as string}</FormHelperText>
                )}
            </FormControl>
        )
    }
)
