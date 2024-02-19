import { FormControlLabel, Switch, SwitchProps } from '@mui/material'
import { FC, memo, useCallback, useEffect, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type MySwitchProps = {
    checkedValue?: unknown
    notCheckedValue?: unknown
    label?: string
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void
    name: string
    labelPlacement?: 'top' | 'bottom' | 'start' | 'end'
    checked?: boolean
} & SwitchProps

export const MySwitch: FC<MySwitchProps> = memo(
    ({
        checkedValue = true,
        notCheckedValue = false,
        name,
        labelPlacement = 'end',
        onChange,
        checked = false,
        label,
        ...props
    }) => {
        const { setValue, control } = useFormContext()

        const value = useWatch({ name, control })

        const isChecked = useMemo(() => {
            return value === checkedValue
        }, [value, checkedValue])

        const onChangeHandler = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                onChange?.(e, checked)
                setValue(name, checked ? checkedValue : notCheckedValue)
            },
            [onChange, setValue, notCheckedValue, checkedValue, name]
        )

        useEffect(() => {
            setValue(name, checked ? checkedValue : notCheckedValue)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [checked])

        return (
            <FormControlLabel
                label={label}
                sx={{ width: 'fit-content' }}
                labelPlacement={labelPlacement}
                control={
                    <Switch
                        checked={isChecked}
                        name={name}
                        onChange={onChangeHandler}
                        {...props}
                    />
                }
            />
        )
    }
)
