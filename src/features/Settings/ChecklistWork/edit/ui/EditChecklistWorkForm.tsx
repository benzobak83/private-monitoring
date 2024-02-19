import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $checklistWork } from '@entities/Settings/ChecklistWork'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { editChecklistWork } from '../model/edit'
import { EditChecklistWorkFormFields, formSchema } from '../model/formSchema'

export const EditChecklistWorkForm: FC = () => {
    const checklistWork = useStore($checklistWork)
    const editChecklistWorkIsPending = useStore(editChecklistWork.pending)

    const formMethods = useForm<EditChecklistWorkFormFields>({
        resolver: zodResolver(formSchema),
    })

    const formId = useId()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: EditChecklistWorkFormFields) => {
        editChecklistWork({ id: checklistWork.id, data })
    }

    return (
        <LoaderWrapper loading={editChecklistWorkIsPending}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <Stack spacing={2} direction={'row'}>
                    <StandartTextField
                        label="Название"
                        name="name"
                        helperText={errors.name?.message}
                        defaultValue={checklistWork.name}
                    />

                    <Button form={formId} type="submit" variant="contained">
                        Сохранить
                    </Button>
                </Stack>
            </FormProvider>
        </LoaderWrapper>
    )
}
