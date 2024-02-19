import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SearchUserSelect } from '@entities/User'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import {
    PickMasterForRegulatoryWorkFormFields,
    formSchema,
} from '../model/formSchema'

type PickMasterForRegulatoryWorkFormProps = {
    regulatoryWork: any
}

const formId = 'pickMasterForRegulatoryWorkForm'

export const PickMasterForRegulatoryWorkForm: FC<
    PickMasterForRegulatoryWorkFormProps
> = ({ regulatoryWork }) => {
    const formMethods = useForm<PickMasterForRegulatoryWorkFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: PickMasterForRegulatoryWorkFormFields) => {
        console.log('regulatoryWork - ', regulatoryWork)
        console.log(data)
    }
    return (
        <FormProvider {...formMethods}>
            <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <ViewFieldPrimitiveValue
                        label="Чеклист работ"
                        value="замена масла"
                    />
                    <ViewFieldPrimitiveValue
                        label="Оборудование"
                        value="насос "
                    />
                    <ViewFieldPrimitiveValue
                        label="Плановая дата проведения"
                        value="00-00-0000"
                    />
                    <ViewFieldPrimitiveValue
                        label="Причина назначения"
                        value="каждую 1 неделю"
                    />
                    <SearchUserSelect
                        label="Мастер"
                        name="masterId"
                        helperText={errors.masterId?.message}
                    />
                </Stack>
                <Button variant="contained" form={formId} type="submit">
                    Начать работы
                </Button>
            </Stack>
        </FormProvider>
    )
}
