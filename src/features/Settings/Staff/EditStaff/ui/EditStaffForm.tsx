import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Tooltip } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useStaffStore } from '@entities/Settings/Staff'
import { useModalContext } from '@shared/providers/ModalProvider'
import { MySwitch } from '@shared/ui/FormFields/MySwitch/MySwitch'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { editStaffFx } from '../model/edit'
import { EditStaffFormFields, formSchema } from '../model/formSchema'

export const EditStaffForm: FC = () => {
    const formMethods = useForm<EditStaffFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const [staff] = useStaffStore((store) => store)

    const {
        handleSubmit,
        formState: { errors },
        watch,
    } = formMethods

    const isAvailable = watch('isAvailable')

    const onSubmit = (data: EditStaffFormFields) => {
        editStaffFx({ data, id: staff.id }).then(closeModal)
    }

    return (
        <FormProvider {...formMethods}>
            <form id="editStuffForm" onSubmit={handleSubmit(onSubmit)}></form>

            <Stack spacing={2} sx={{ width: '500px' }}>
                <ViewFieldPrimitiveValue label="ФИО" value={staff.name} />
                <ViewFieldPrimitiveValue
                    label="Должность"
                    value={staff.workPosition}
                />
                <ViewFieldPrimitiveValue
                    label="Подразделение"
                    value={staff.subdivision}
                />
                <MyPaper title="Доступ в приложения" sx={{ textAlign: 'left' }}>
                    <Stack spacing={2}>
                        <MySwitch
                            name="isAvailable"
                            label="Включить доступ"
                            checked={staff.isAvailable}
                        />
                        {isAvailable && (
                            <>
                                <StandartTextField
                                    name="login"
                                    label="Логин"
                                    defaultValue={staff.login}
                                    helperText={errors.login?.message}
                                />
                                <Tooltip title="Оставьте поле пустым, если не хотите менять пароль">
                                    <StandartTextField
                                        name="password"
                                        label="Пароль"
                                        helperText={errors.password?.message}
                                        type="password"
                                    />
                                </Tooltip>
                            </>
                        )}
                    </Stack>
                </MyPaper>

                <Button form="editStuffForm" type="submit" variant="contained">
                    Сохранить
                </Button>
            </Stack>
        </FormProvider>
    )
}
