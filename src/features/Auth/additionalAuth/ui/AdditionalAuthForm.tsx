import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Card, Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { redirect } from 'react-router-dom'
import { ROUTES } from '@shared/lib/consts/routes'
import { emitErrorLog } from '@shared/notification'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { additionalLoginFx } from '../model/authByAdditionalToken'
import { AdditionalAuthFormFields, formSchema } from '../model/formSchema'
import { initUserFx } from '../model/initUser'

const formId = 'loginFormId'

export const AdditionalAuthForm: FC = () => {
    const additionalLoginFxIsLoading = useStore(additionalLoginFx.pending)

    const formMethods = useForm<AdditionalAuthFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const onHadleSubmit = (data: AdditionalAuthFormFields) => {
        additionalLoginFx(data)
            .then(() => {
                initUserFx()
            })
            .then(() => redirect(ROUTES.work.general))
            .catch((e) => emitErrorLog(undefined, 'Неверный логин или пароль!'))
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Card
                sx={{
                    padding: 4,
                    minWidth: '350px',
                    maxWidth: '400px',
                    width: '30%',
                }}
            >
                <FormProvider {...formMethods}>
                    <form id={formId} onSubmit={handleSubmit(onHadleSubmit)}>
                        <Stack spacing={3}>
                            <Typography
                                variant="h1"
                                sx={{ textAlign: 'center' }}
                            >
                                Авторизация
                            </Typography>

                            <Stack spacing={1.5}>
                                <StandartTextField
                                    label="Логин"
                                    name="login"
                                    helperText={errors?.login?.message}
                                />
                                <StandartTextField
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    helperText={errors?.password?.message}
                                />
                            </Stack>
                            <MyButton
                                isLoading={additionalLoginFxIsLoading}
                                variant="contained"
                                type="submit"
                            >
                                Войти
                            </MyButton>
                        </Stack>
                    </form>
                </FormProvider>
            </Card>
        </Box>
    )
}
