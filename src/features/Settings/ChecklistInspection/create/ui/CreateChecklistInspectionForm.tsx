import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useModalContext } from '@shared/providers/ModalProvider'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { createChecklistInspectionFx } from '../model/create'
import {
    CreateChecklistInspectionFormFields,
    formSchema,
} from '../model/formSchema'

export const CreateChecklistInspectionForm: FC = () => {
    const formMethods = useForm<CreateChecklistInspectionFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: CreateChecklistInspectionFormFields) => {
        createChecklistInspectionFx(data).then(() => closeModal())
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="createChecklistInspectionForm"
                onSubmit={handleSubmit(onSubmit)}
            ></form>

            <Stack spacing={2}>
                <StandartTextField
                    label="Название"
                    name="name"
                    helperText={errors.name?.message}
                />

                <Button
                    form="createChecklistInspectionForm"
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Stack>
        </FormProvider>
    )
}
