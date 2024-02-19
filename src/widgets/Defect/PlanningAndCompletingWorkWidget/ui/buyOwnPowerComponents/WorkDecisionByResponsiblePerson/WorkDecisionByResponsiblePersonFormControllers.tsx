import { Stack } from '@mui/material'
import { FC } from 'react'
import {
    AgreeAgreementBtn,
    RefuseAgreementBtn,
} from '@/features/Defect/CompletingWork/agreementByResponsiblePerson'
import { WORK_DECISION_FORM_IDS } from '../../../lib/workDecisionFormIds'

type WorkDecisionByResponsiblePersonFormControllersProps = {
    agreeAgreementIsLoading: boolean
    refuseAgreementIsLoading: boolean
}

export const WorkDecisionByResponsiblePersonFormControllers: FC<
    WorkDecisionByResponsiblePersonFormControllersProps
> = ({ agreeAgreementIsLoading, refuseAgreementIsLoading }) => {
    return (
        <Stack direction={'row'} spacing={2}>
            <AgreeAgreementBtn
                formId={WORK_DECISION_FORM_IDS.agreeWorkDecision}
                loading={agreeAgreementIsLoading}
            />
            <RefuseAgreementBtn
                formId={WORK_DECISION_FORM_IDS.refuseWorkDecision}
                loading={refuseAgreementIsLoading}
            />
        </Stack>
    )
}
