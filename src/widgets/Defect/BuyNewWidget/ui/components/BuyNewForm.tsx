import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { putNewEquipmentIntoOperationFx } from '@/features/Defect/putNewEquipmentIntoOperation'
import { getDefectFx } from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { BuyNewFormFields, formSchema } from '../../model/formSchema'

export const BuyNewForm: FC = () => {
    const putNewEquipmentIntoOperationFxIsLoading = useStore(
        putNewEquipmentIntoOperationFx.pending
    )

    const formMethods = useForm<BuyNewFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const { id } = useDefaultParams()

    const onSubmit = (data: BuyNewFormFields) => {
        putNewEquipmentIntoOperationFx({ id, data }).then(() => getDefectFx(id))
    }

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1.5}>
                    <StandartTextField
                        label="Заменяемое оборудование"
                        name="equipmentOld"
                        multiline
                        helperText={errors?.equipmentOld?.message}
                        minRows={2}
                    />
                    <StandartTextField
                        label="Выберите вновь приобретенное оборудование"
                        name="equipmentNew"
                        multiline
                        helperText={errors?.equipmentNew?.message}
                        minRows={2}
                    />

                    {/* <DefaultSelect
                        options={OPTIONS}
                        label="Статус заменяемого оборудования"
                        name="replacementEquipment"
                    />   //TODO: нету статусов на бэке */}

                    <MyButton
                        isLoading={putNewEquipmentIntoOperationFxIsLoading}
                        variant="contained"
                        type="submit"
                        sx={{ width: 'fit-content' }}
                    >
                        Новое оборудование введено в эксплуатацию
                    </MyButton>
                </Stack>
            </form>
        </FormProvider>
    )
}
