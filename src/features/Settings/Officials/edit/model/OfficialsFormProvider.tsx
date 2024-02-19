import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { editOfficialsFx } from './edit'
import { EditOfficialsFormFields, formSchema } from './formSchema'

type OfficialsFormProviderProps = {
    children: ReactNode
}

export const OfficialsFormProvider: FC<OfficialsFormProviderProps> = ({
    children,
}) => {
    const formMethods = useForm<EditOfficialsFormFields>({
        resolver: zodResolver(formSchema),
    })
    const { handleSubmit } = formMethods

    const onSubmit = (data: EditOfficialsFormFields) => {
        //TODO: это переправить на скорую руку сделано
        editOfficialsFx(data).then(() => window.location.reload())
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="editOfficialsForm"
                onSubmit={handleSubmit(onSubmit)}
            ></form>
            {children}
        </FormProvider>
    )
}
