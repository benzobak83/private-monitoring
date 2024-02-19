import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useCheckStateByIdFromDict } from '@entities/Dict'
import { StateCheckIds, TCheck } from '../model/types/types'
import { ResultOfCheck } from './ResultOfCheck'

type ResultOfCheckWithInformationProps = {
    check: TCheck

    handleClick: (id: number) => void
}

export const ResultOfCheckWithInformation: FC<
    ResultOfCheckWithInformationProps
> = ({ check, handleClick }) => {
    const state = useCheckStateByIdFromDict(check.state?.id)
    return (
        <Stack
            direction={'row'}
            spacing={1}
            onClick={() => handleClick(check.id)}
        >
            {check?.result?.id && (
                <ResultOfCheck typeResult={check?.result?.id} />
            )}
            <Stack spacing={0.5}>
                <Typography variant="h6">
                    {check.lastCheck && `${check.lastCheck} -`}{' '}
                    {check?.user?.name}{' '}
                    {state?.id !== StateCheckIds.COMPLETED &&
                        ` (${state?.name})`}
                </Typography>
                <Typography>{check.comment}</Typography>
            </Stack>
        </Stack>
    )
}
