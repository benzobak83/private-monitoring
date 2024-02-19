import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $objectItem } from '@entities/Object'
import { SearchChecklistInspectionSelect } from '@entities/Settings/ChecklistInspection'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModalContext } from '@shared/providers/ModalProvider'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { editObjectFx } from '../model/editObject'
import { EditObjectFormFields, formSchema } from '../model/formSchema'

const formId = 'editObjectForm'

export const EditObjectForm: FC = () => {
    const object = useStore($objectItem)
    const editObjectFxIsLoading = useStore(editObjectFx.pending)

    const formMethods = useForm<EditObjectFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const { id } = useDefaultParams()

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: EditObjectFormFields) => {
        editObjectFx({ id, data }).then(closeModal)
    }
    return (
        <LoaderWrapper loading={editObjectFxIsLoading}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <Stack sx={{ width: '500px' }} spacing={1}>
                    <ViewFieldPrimitiveValue
                        label="Название"
                        value={'название объекта'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Направление"
                        value={'водоснабжение'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Вид деятельности"
                        value={'Транспортировка питьевой воды'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Территория"
                        value={'Водоотведение Лянгасово'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Подразделение"
                        value={'НСГ'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Адрес"
                        value={'ул. Ленина, 1'}
                    />
                    <ViewFieldPrimitiveValue
                        label="Закрепленный за объектом сотрудник (ОПО)"
                        value={'Иванов И.И.'}
                    />
                </Stack>
                <Box mt={1}>
                    <SearchChecklistInspectionSelect
                        helperText={errors.checklistId?.message}
                        defaultValue={object.checklist}
                        name="checklistId"
                    />
                </Box>
                <Button
                    variant="contained"
                    form={formId}
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Сохранить
                </Button>
            </FormProvider>
        </LoaderWrapper>
    )
}
