import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    TAgreementByEmployeeFxRequest,
    agreementByEmployeeFx,
} from '@/features/Defect/PlanningWork/agreementByEmployee'
import { usePlanningWorkContext } from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { AGREEMENT_FORM_IDS } from '../../lib/agreementFormIds'
import { AgreementFormType } from '../../model/types'
import { AgreementFormControllers } from './AgreementFormControllers'
import { AgreementFormFields, formSchema } from './formSchema'

export const AgreementForm = () => {
    const [agreeAgreementIsLoading, setAgreeAgreementIsLoading] =
        useState<boolean>(false)
    const [refuseAgreementIsLoading, setRefuseAgreementIsLoading] =
        useState<boolean>(false)

    const { planningWork } = usePlanningWorkContext()

    const { id } = useDefaultParams()

    const formMethods = useForm<AgreementFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const getOnSubmit = (type: AgreementFormType) => {
        return (data: AgreementFormFields) => {
            if (type === AGREEMENT_FORM_IDS.agreeAgreement) {
                setAgreeAgreementIsLoading(true)
                const filteredData: TAgreementByEmployeeFxRequest = {
                    ...data,
                    status: true,
                    planningApprovalId: planningWork?.agreement?.id,
                }
                agreementByEmployeeFx({ data: filteredData, id }).finally(
                    () => {
                        setAgreeAgreementIsLoading(false)
                    }
                )
            }
            if (type === AGREEMENT_FORM_IDS.refuseAgreement) {
                setRefuseAgreementIsLoading(true)
                const filteredData: TAgreementByEmployeeFxRequest = {
                    ...data,
                    status: false,
                    planningApprovalId: planningWork?.agreement?.id,
                }
                agreementByEmployeeFx({ data: filteredData, id }).finally(
                    () => {
                        setRefuseAgreementIsLoading(false)
                    }
                )
            }
        }
    }

    return (
        <Box>
            <FormProvider {...formMethods}>
                <form
                    onSubmit={handleSubmit(
                        getOnSubmit(AGREEMENT_FORM_IDS.agreeAgreement)
                    )}
                    id={AGREEMENT_FORM_IDS.agreeAgreement}
                />
                <form
                    onSubmit={handleSubmit(
                        getOnSubmit(AGREEMENT_FORM_IDS.refuseAgreement)
                    )}
                    id={AGREEMENT_FORM_IDS.refuseAgreement}
                />

                <Stack spacing={1}>
                    <Typography variant="h6">Сотрудник ОПП:</Typography>
                    <StandartTextField
                        label="Лимит"
                        name="sum"
                        type="number"
                        helperText={errors.sum?.message}
                        sx={{ width: '300px' }}
                    />
                    <StandartTextField
                        label="Комментарий"
                        name="comment"
                        helperText={errors.comment?.message}
                        multiline
                        minRows={4}
                    />
                    <AgreementFormControllers
                        agreeAgreementIsLoading={agreeAgreementIsLoading}
                        refuseAgreementIsLoading={refuseAgreementIsLoading}
                    />
                </Stack>
            </FormProvider>
        </Box>
    )
}
