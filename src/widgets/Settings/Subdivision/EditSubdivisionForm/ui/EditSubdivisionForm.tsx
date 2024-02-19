import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSubdivisionStore } from '@entities/Settings/Subdivision'
import { SearchUserSelect } from '@entities/User'
import { useModalContext } from '@shared/providers/ModalProvider'
import { editSubdivisionFx } from '../model/editSubdivision'
import { EditSubdivisionFormFields, formSchema } from '../model/formSchema'

export const EditSubdivisionForm: FC = () => {
    const formMethods = useForm<EditSubdivisionFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const [subdivision] = useSubdivisionStore((store) => store)

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: EditSubdivisionFormFields) => {
        editSubdivisionFx({ data, id: subdivision.id }).then(closeModal)
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="editSubdivisionForm"
                onSubmit={handleSubmit(onSubmit)}
            ></form>
            <Stack spacing={2}>
                <SearchUserSelect
                    name="userId"
                    defaultValue={subdivision.user}
                    helperText={errors?.userId?.message}
                    label="Начальник"
                />

                <Button
                    form="editSubdivisionForm"
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Stack>
        </FormProvider>
    )
}
