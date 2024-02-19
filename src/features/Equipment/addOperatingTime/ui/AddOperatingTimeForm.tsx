import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Stack, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { $operatingTime } from '@entities/Equipment'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { addOperatingTimeFx } from '../model/addOperatingTime'
import { AddOperatingTimeFormFields, formSchema } from '../model/formSchema'

type AddOperatingTimeForm = {
    setAllTime?: React.Dispatch<React.SetStateAction<number>>
    allTimeInit: number
}

export const AddOperatingTimeForm: FC<AddOperatingTimeForm> = ({
    allTimeInit = 0,
    setAllTime,
}) => {
    const operatingTime = useStore($operatingTime)
    const addOperatingTimeFxIsLoading = useStore(addOperatingTimeFx.pending)

    const formMethods = useForm<AddOperatingTimeFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        control,
        setValue,

        formState: { errors },
    } = formMethods

    const { id } = useDefaultParams()

    const currentTime = useWatch({ control, name: 'value' }) || 0
    const allTime = useWatch({ control, name: 'sum' }) || 0

    const handleChaneAllTime = (val: string | number) => {
        setValue('value', Number(val) - allTimeInit)
    }

    const onSubmit = (data: AddOperatingTimeFormFields) => {
        const filteredData = {
            ...data,
            equipmentId: id, //TODO: бэк должен убрать это поле
        }
        addOperatingTimeFx({ data: filteredData, id })
    }

    useEffect(() => {
        setValue('value', 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operatingTime])

    useEffect(() => {
        setAllTime?.(Number(allTime))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTime])
    return (
        <Box sx={{ flex: '0 1 50%', minWidth: '100px' }}>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <StandartTextField
                            label="Кол-во часов за смену"
                            name="value"
                            type="number"
                            helperText={errors.value?.message}
                        />
                        <StandartTextField
                            label="Нарастающее показание"
                            name="sum"
                            helperText={errors?.sum?.message}
                            onChange={handleChaneAllTime}
                            type="number"
                            defaultValue={allTimeInit + Number(currentTime)}
                        />
                        <LoadingButton
                            sx={{ alignSelf: 'flex-start' }}
                            type="submit"
                            loading={addOperatingTimeFxIsLoading}
                        >
                            Сохранить
                        </LoadingButton>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    )
}
