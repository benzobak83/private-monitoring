import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { completingWorkFx } from '@/features/Defect/CompletingWork/completingWork'
import {
    $defect,
    RejectedBlock,
    useCompletingWorkContext,
    usePlanningWorkContext,
} from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { CompletingWorkFormFields } from '../../buyHimselfComponents/CompletingWork/formSchema'
import { CompletingWorkByMasterFormFields, formSchema } from './formSchema'

export const CompletingWorkByMasterForm: FC = () => {
    const defect = useStore($defect)

    const [loading, setLoading] = useState<boolean>(false)

    const { id } = useDefaultParams()

    const { completingWork } = useCompletingWorkContext()
    const { planningWork } = usePlanningWorkContext()

    const formMethods = useForm<CompletingWorkByMasterFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const onSubmit = (data: CompletingWorkFormFields) => {
        setLoading(true)
        const filteredData = {
            ...data,
            method: defect?.method?.id,
        }
        completingWorkFx({
            data: filteredData,
            id,
            executionId: completingWork.id,
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <StandartTextField
                        minRows={3}
                        multiline
                        helperText={errors.comment?.message}
                        label="Комментарий о выполненной работе"
                        name="comment"
                    />
                    {completingWork?.agreement?.status === false && (
                        <RejectedBlock
                            fullName={planningWork?.responsible?.name}
                            date={completingWork?.agreement?.date}
                            msg={completingWork?.agreement?.comment}
                        />
                    )}
                    <MyButton
                        variant="contained"
                        isLoading={loading}
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
