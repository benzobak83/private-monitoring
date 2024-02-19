import { Divider, Stack } from '@mui/material'
import { FC, Fragment } from 'react'
import { TAgreement } from '@entities/Defect'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { AgreementWithResponsiblePersonForm } from './AgreementWithResponsiblePersonForm'
import { AgreementWithResponsiblePersonView } from './AgreementWithResponsiblePersonView'

type AgreementWithResponsiblePersonFormList = {
    responsiblePersons: TAgreement[]
}

const MOCK_CUURENT_USER_ID = 20000000000000000000

export const AgreementWithResponsiblePersonFormList: FC<
    AgreementWithResponsiblePersonFormList
> = ({ responsiblePersons }) => {
    return (
        <LoaderWrapper loading={false}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {responsiblePersons.map((responsiblePerson) => {
                    return (
                        <Fragment key={responsiblePerson.id}>
                            {responsiblePerson.id !== MOCK_CUURENT_USER_ID &&
                            !responsiblePerson.answer ? (
                                <AgreementWithResponsiblePersonForm
                                    responsiblePerson={responsiblePerson}
                                />
                            ) : (
                                <AgreementWithResponsiblePersonView
                                    responsiblePerson={responsiblePerson}
                                />
                            )}
                        </Fragment>
                    )
                })}
            </Stack>
        </LoaderWrapper>
    )
}
