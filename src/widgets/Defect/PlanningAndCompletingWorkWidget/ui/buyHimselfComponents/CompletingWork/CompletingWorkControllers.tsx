import { Stack } from '@mui/material'
import { FC } from 'react'
import { CompletingWorkBtn } from '@/features/Defect/CompletingWork/completingWork'
import { TransferWorkToHeadOfTheDepartmentBtn } from '@/features/Defect/CompletingWork/transferWorkToHeadOfTheDepartment'

type CompletingWorkControllersProps = {
    completingWorkFxIsLoading: boolean
    transferWorkToHeadOfTheDepartmentFxIsLoading: boolean
}

export const CompletingWorkControllers: FC<CompletingWorkControllersProps> = ({
    completingWorkFxIsLoading,
    transferWorkToHeadOfTheDepartmentFxIsLoading,
}) => {
    return (
        <Stack direction={'row'} spacing={2}>
            <CompletingWorkBtn
                formId="workCompleted"
                loading={completingWorkFxIsLoading}
            />
            <TransferWorkToHeadOfTheDepartmentBtn
                formId="transferWork"
                loading={transferWorkToHeadOfTheDepartmentFxIsLoading}
            />
        </Stack>
    )
}
