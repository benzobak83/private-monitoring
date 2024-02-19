import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DefectPrioritySelect } from '@entities/Dict'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModalContext } from '@shared/providers/ModalProvider'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { editPriorityFx } from '../model/editPriority'
import { EditPriorityFormFields, formSchema } from '../model/formSchema'

const formId = 'editPriorityForm'

type EditPriorityFormProps = {
    priority: number
}

export const EditPriorityForm: FC<EditPriorityFormProps> = ({ priority }) => {
    const editPriorityFxIsLoading = useStore(editPriorityFx.pending)

    const formMethods = useForm<EditPriorityFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const { id } = useDefaultParams()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: EditPriorityFormFields) => {
        editPriorityFx({ id, data }).then(closeModal)
    }
    return (
        <LoaderWrapper loading={editPriorityFxIsLoading}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <Stack spacing={2}>
                    <DefectPrioritySelect
                        name="priority"
                        defaultValue={priority}
                        helperText={errors.priority?.message}
                    />
                    <Button variant="contained" form={formId} type="submit">
                        Сохранить
                    </Button>
                </Stack>
            </FormProvider>
        </LoaderWrapper>
    )
}
