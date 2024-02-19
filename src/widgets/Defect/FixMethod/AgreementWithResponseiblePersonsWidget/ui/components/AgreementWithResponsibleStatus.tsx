import { Chip } from '@mui/material'
import { FC } from 'react'

type AgreementWithResponsibleStatus = {
    choiceIsMade: boolean
}

export const AgreementWithResponsibleStatus: FC<
    AgreementWithResponsibleStatus
> = ({ choiceIsMade }) => {
    if (choiceIsMade) {
        return <Chip label={'Выбор сделан'} size="small" color={'success'} />
    } else {
        return (
            <Chip label={'Выбор ещё не сделан'} size="small" color={'error'} />
        )
    }
}
