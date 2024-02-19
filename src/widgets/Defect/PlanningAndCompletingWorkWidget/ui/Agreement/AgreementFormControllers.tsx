import { Stack } from '@mui/material'
import { FC } from 'react'
import {
    AgreeAgreementBtn,
    RefuseAgreementBtn,
} from '@/features/Defect/PlanningWork/agreementByEmployee'
import { usePlanningWorkContext } from '@entities/Defect'
import { AGREEMENT_FORM_IDS } from '../../lib/agreementFormIds'

type AgreementFormControllersProps = {
    agreeAgreementIsLoading: boolean
    refuseAgreementIsLoading: boolean
}

export const AgreementFormControllers: FC<AgreementFormControllersProps> = ({
    agreeAgreementIsLoading,
    refuseAgreementIsLoading,
}) => {
    const { planningWork } = usePlanningWorkContext()

    const isAccess = planningWork.agreement.isViewApproval

    return (
        <Stack direction={'row'} spacing={2}>
            <AgreeAgreementBtn
                disabled={!isAccess}
                formId={AGREEMENT_FORM_IDS.agreeAgreement}
                loading={agreeAgreementIsLoading}
            />
            <RefuseAgreementBtn
                disabled={!isAccess}
                formId={AGREEMENT_FORM_IDS.refuseAgreement}
                loading={refuseAgreementIsLoading}
            />
        </Stack>
    )
}
