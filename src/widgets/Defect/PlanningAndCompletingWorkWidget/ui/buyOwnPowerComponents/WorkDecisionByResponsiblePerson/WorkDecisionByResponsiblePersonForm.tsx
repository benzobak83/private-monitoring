import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    TAgreementByResponsiblePersonFxRequest,
    agreementByResponsiblePersonFx,
} from '@/features/Defect/CompletingWork/agreementByResponsiblePerson'
import { useCompletingWorkContext } from '@entities/Defect'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { WORK_DECISION_FORM_IDS } from '../../../lib/workDecisionFormIds'
import { WorkDecisionFormType } from '../../../model/types'
import {
    WorkDecisionByResponsiblePersonFormFields,
    formSchema,
} from './formSchema'
import { WorkDecisionByResponsiblePersonFormControllers } from './WorkDecisionByResponsiblePersonFormControllers'

export const WorkDecisionByResponsiblePersonForm: FC = () => {
    const [agreeAgreementIsLoading, setAgreeAgreementIsLoading] =
        useState<boolean>(false)
    const [refuseAgreementIsLoading, setRefuseAgreementIsLoading] =
        useState<boolean>(false)

    const { completingWork } = useCompletingWorkContext()

    const { id } = useDefaultParams()

    const formMethods = useForm<WorkDecisionByResponsiblePersonFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const getOnSubmit = (type: WorkDecisionFormType) => {
        return (data: WorkDecisionByResponsiblePersonFormFields) => {
            if (type === WORK_DECISION_FORM_IDS.agreeWorkDecision) {
                setAgreeAgreementIsLoading(true)
                const filteredData: TAgreementByResponsiblePersonFxRequest = {
                    ...data,
                    status: true,
                    executionApprovalId: completingWork?.agreement?.id,
                }
                agreementByResponsiblePersonFx({
                    data: filteredData,
                    id,
                }).finally(() => {
                    setAgreeAgreementIsLoading(false)
                })
            }
            if (type === WORK_DECISION_FORM_IDS.refuseWorkDecision) {
                setRefuseAgreementIsLoading(true)
                const filteredData: TAgreementByResponsiblePersonFxRequest = {
                    ...data,
                    status: false,
                    executionApprovalId: completingWork?.agreement?.id,
                }
                agreementByResponsiblePersonFx({
                    data: filteredData,
                    id,
                }).finally(() => {
                    setRefuseAgreementIsLoading(false)
                })
            }
        }
    }

    return (
        <Box>
            <FormProvider {...formMethods}>
                <form
                    onSubmit={handleSubmit(
                        getOnSubmit(WORK_DECISION_FORM_IDS.agreeWorkDecision)
                    )}
                    id={WORK_DECISION_FORM_IDS.agreeWorkDecision}
                />
                <form
                    onSubmit={handleSubmit(
                        getOnSubmit(WORK_DECISION_FORM_IDS.refuseWorkDecision)
                    )}
                    id={WORK_DECISION_FORM_IDS.refuseWorkDecision}
                />

                <Stack spacing={1}>
                    <StandartTextField
                        label="Комментарий"
                        name="comment"
                        helperText={errors.comment?.message}
                        multiline
                        minRows={4}
                    />
                    <WorkDecisionByResponsiblePersonFormControllers
                        agreeAgreementIsLoading={agreeAgreementIsLoading}
                        refuseAgreementIsLoading={refuseAgreementIsLoading}
                    />
                </Stack>
            </FormProvider>
        </Box>
    )
}
