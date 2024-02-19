import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useModalContext } from '@shared/providers/ModalProvider'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { createChecklistWorkFx } from '../model/create'
import { CreateChecklistWorkFormFields, formSchema } from '../model/formSchema'

export const CreateChecklistWorkForm: FC = () => {
    const formMethods = useForm<CreateChecklistWorkFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: CreateChecklistWorkFormFields) => {
        createChecklistWorkFx(data).then(() => closeModal())
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="createChecklistWorkForm"
                onSubmit={handleSubmit(onSubmit)}
            ></form>

            <Stack spacing={2}>
                <StandartTextField
                    label="Название"
                    name="name"
                    helperText={errors.name?.message}
                />

                <Button
                    form="createChecklistWorkForm"
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Stack>
        </FormProvider>
    )
}
