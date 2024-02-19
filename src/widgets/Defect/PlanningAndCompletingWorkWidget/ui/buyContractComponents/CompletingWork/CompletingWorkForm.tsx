import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { completingWorkFx } from '@/features/Defect/CompletingWork/completingWork'
import { FixMethodTypeIds, useCompletingWorkContext } from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { CompletingWorkFormFields, formSchema } from './formSchema'

export const CompletingWorkForm: FC = () => {
    const completingWorkFxIsLoading = useStore(completingWorkFx.pending)

    const { id } = useDefaultParams()

    const { completingWork } = useCompletingWorkContext()

    const formMethods = useForm<CompletingWorkFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const onSubmit = (data: CompletingWorkFormFields) => {
        const filteredData = {
            ...data,
            method: FixMethodTypeIds.CONTRACT,
        }
        completingWorkFx({
            data: filteredData,
            id,
            executionId: completingWork.id,
        })
    }
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                    <StandartTextField
                        minRows={3}
                        multiline
                        helperText={errors.comment?.message}
                        label="Комментарий о выполненной работе"
                        name="comment"
                    />
                    <MyButton
                        isLoading={completingWorkFxIsLoading}
                        variant="contained"
                        type="submit"
                        sx={{ width: 'fit-content' }}
                    >
                        Работы завершены
                    </MyButton>
                </Stack>
            </form>
        </FormProvider>
    )
}
