import { Box, Stack } from '@mui/material'
import { FC, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { MySwitch } from '@shared/ui/FormFields/MySwitch/MySwitch'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { HeadOfDepartmentStepOneFormFields } from '../../model/formSchema'

export const CostByUnit: FC = () => {
    const {
        formState: { errors },
        control,
        setValue,
    } = useFormContext<HeadOfDepartmentStepOneFormFields>()

    const weCanValue = useWatch({ control, name: 'weCan' })

    useEffect(() => {
        weCanValue && setValue('sum', undefined)
    }, [weCanValue, setValue])

    return (
        <Stack direction={'row'} spacing={1}>
            <Box sx={{ minWidth: 350 }}>
                <StandartTextField
                    disabled={!!weCanValue}
                    helperText={errors?.sum?.message}
                    type="number"
                    label="Стоимость выполнения силами подразделения"
                    name="sum"
                />
            </Box>
            <MySwitch name="weCan" label="Не можем" />
        </Stack>
    )
}
