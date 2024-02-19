import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { completingWorkFx } from '@/features/Defect/CompletingWork/completingWork'
import { FixMethodTypeIds, useCompletingWorkContext } from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { CompletingWorkControllers } from './CompletingWorkControllers'
import { CompletingWorkFormFields, formSchema } from './formSchema'

type CompletingWorkFormType = 'workCompleted' | 'transferWork'

export const CompletingWorkForm: FC = () => {
    const [completingWorkFxIsLoading, setCompletingWorkFxIsLoading] =
        useState<boolean>(false)
    const [
        transferWorkToHeadOfTheDepartmentFxIsLoading,
        setTransferWorkToHeadOfTheDepartmentFxIsLoading,
    ] = useState<boolean>(false)

    const { id } = useDefaultParams()

    const { completingWork } = useCompletingWorkContext()

    const formMethods = useForm<CompletingWorkFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const getOnSubmit = (type: CompletingWorkFormType) => {
        return (data: CompletingWorkFormFields) => {
            if (type === 'transferWork') {
                setTransferWorkToHeadOfTheDepartmentFxIsLoading(true)
                const filteredData = {
                    ...data,
                    method: FixMethodTypeIds.TRANSFER_TO_HEAD_OF_THE_DEPARTMENT,
                }
                completingWorkFx({
                    data: filteredData,
                    id,
                    executionId: completingWork.id,
                }).finally(() => {
                    setTransferWorkToHeadOfTheDepartmentFxIsLoading(false)
                })
            }
            if (type === 'workCompleted') {
                setCompletingWorkFxIsLoading(true)
                const filteredData = {
                    ...data,
                    method: FixMethodTypeIds.HIMSELF,
                }
                completingWorkFx({
                    data: filteredData,
                    id,
                    executionId: completingWork.id,
                }).finally(() => {
                    setCompletingWorkFxIsLoading(false)
                })
            }
        }
    }
    return (
        <FormProvider {...formMethods}>
            <form
                id={'transferWork'}
                onSubmit={handleSubmit(getOnSubmit('transferWork'))}
            ></form>
            <form
                id={'workCompleted'}
                onSubmit={handleSubmit(getOnSubmit('workCompleted'))}
            ></form>
            <Stack spacing={2}>
                <StandartTextField
                    minRows={3}
                    multiline
                    helperText={errors.comment?.message}
                    label="Комментарий"
                    name="comment"
                />
                <CompletingWorkControllers
                    completingWorkFxIsLoading={completingWorkFxIsLoading}
                    transferWorkToHeadOfTheDepartmentFxIsLoading={
                        transferWorkToHeadOfTheDepartmentFxIsLoading
                    }
                />
            </Stack>
        </FormProvider>
    )
}
