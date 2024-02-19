import { Stack } from '@mui/material'
import { FC } from 'react'
import { TAgreement } from '@entities/Defect'
import { useAgreementAnswerByDict } from '@entities/Dict'
import { StandartRadioView } from '@shared/ui/FormFields/StandartRadio/StandartRadioView'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { AgreementWithResponsibleStatus } from './AgreementWithResponsibleStatus'
import { ResponsiblePersonInfo } from './ResponsiblePersonInfo'

type AgreementWithResponsiblePersonViewProps = {
    responsiblePerson: TAgreement
}

export const AgreementWithResponsiblePersonView: FC<
    AgreementWithResponsiblePersonViewProps
> = ({ responsiblePerson }) => {
    const agreementAnswers = useAgreementAnswerByDict()
    return (
        <Stack sx={{ width: '100%' }} spacing={1}>
            <ResponsiblePersonInfo responsiblePerson={responsiblePerson} />
            <StandartRadioView
                options={agreementAnswers}
                getOptionLabel={(option) => option.name}
                defaultValue={responsiblePerson?.answer?.id}
                label="Работы будет выполнять:"
                labelType="light"
            />
            <AgreementWithResponsibleStatus
                choiceIsMade={!!responsiblePerson?.answer}
            />
            <ViewFieldPrimitiveValue
                label="Сумма"
                value={responsiblePerson.sum}
            />
        </Stack>
    )
}
