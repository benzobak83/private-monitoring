import { Divider, Stack } from '@mui/material'
import { useMethodContext } from '@entities/Defect'
import { AgreementWithResponsiblePersonView } from './AgreementWithResponsiblePersonView'

export const AgreementWithResponsiblePersonViewList = () => {
    const { method } = useMethodContext()
    return (
        <Stack spacing={1}>
            <Stack
                direction={'row'}
                justifyContent={'space-around'}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {method.agreement?.map((responsiblePerson) => (
                    <AgreementWithResponsiblePersonView
                        responsiblePerson={responsiblePerson}
                        key={responsiblePerson.id}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
