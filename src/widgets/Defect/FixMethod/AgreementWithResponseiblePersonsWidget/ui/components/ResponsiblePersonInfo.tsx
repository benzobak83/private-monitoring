import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { TAgreement } from '@entities/Defect'
import { useTypeManagerFromDict } from '@entities/Dict'

type ResponsiblePersonInfoProps = {
    responsiblePerson: TAgreement
}

export const ResponsiblePersonInfo: FC<ResponsiblePersonInfoProps> = ({
    responsiblePerson,
}) => {
    const job = useTypeManagerFromDict(responsiblePerson.key)
    return (
        <Stack>
            <Typography variant="h4">{job?.name}</Typography>
            <Typography>{responsiblePerson.user.name}</Typography>
        </Stack>
    )
}
