import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $checklistInspection } from '@entities/Settings/ChecklistInspection'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { editChecklistInspection } from '../model/edit'
import {
    EditChecklistInspectionFormFields,
    formSchema,
} from '../model/formSchema'

export const EditChecklistInterspectionForm: FC = () => {
    const checklistInspection = useStore($checklistInspection)
    const editChecklistInspectionIsPending = useStore(
        editChecklistInspection.pending
    )

    const formMethods = useForm<EditChecklistInspectionFormFields>({
        resolver: zodResolver(formSchema),
    })

    const formId = useId()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: EditChecklistInspectionFormFields) => {
        editChecklistInspection({ id: checklistInspection.id, data })
    }

    return (
        <LoaderWrapper loading={editChecklistInspectionIsPending}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <Stack spacing={2} direction={'row'}>
                    <StandartTextField
                        label="Название"
                        name="name"
                        helperText={errors.name?.message}
                        defaultValue={checklistInspection.name}
                    />

                    <Button form={formId} type="submit" variant="contained">
                        Сохранить
                    </Button>
                </Stack>
            </FormProvider>
        </LoaderWrapper>
    )
}
