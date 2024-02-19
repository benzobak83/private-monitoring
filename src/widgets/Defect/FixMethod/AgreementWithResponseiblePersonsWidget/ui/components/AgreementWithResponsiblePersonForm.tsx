import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { agreementByResponsiblePersonFx } from '@/features/Defect/FixMethod/agreementByAgreementPerson'
import { AgreementAnswerIds, TAgreement } from '@entities/Defect'
import { useAgreementAnswerByDict } from '@entities/Dict'
import { GoToMaterials } from '@entities/Material'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartRadio } from '@shared/ui/FormFields/StandartRadio/StandartRadio'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import {
    AgreementWithResponsibleFormFeilds,
    formSchema,
} from '../../model/formSchema'
import { ResponsiblePersonInfo } from './ResponsiblePersonInfo'

type AgreementWithResponsiblePersonFormProps = {
    responsiblePerson: TAgreement
}

export const AgreementWithResponsiblePersonForm: FC<
    AgreementWithResponsiblePersonFormProps
> = ({ responsiblePerson }) => {
    const { id } = useDefaultParams()

    const agreementAnswers = useAgreementAnswerByDict()

    const [loading, setLoading] = useState<boolean>(false)
    const formMethod = useForm<AgreementWithResponsibleFormFeilds>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = formMethod

    const answer = useWatch({ name: 'answer', control }) as
        | AgreementAnswerIds
        | string

    const onSubmit = (data: AgreementWithResponsibleFormFeilds) => {
        setLoading(true)
        const filteredData = {
            ...data,
            diagnosticAgreementId: responsiblePerson.id,
        }
        agreementByResponsiblePersonFx({ data: filteredData, id }).finally(
            () => {
                setLoading(false)
            }
        )
    }

    return (
        <Stack sx={{ width: '100%' }}>
            <FormProvider {...formMethod}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ResponsiblePersonInfo
                        responsiblePerson={responsiblePerson}
                    />
                    <Stack mt={1} spacing={1}>
                        <StandartRadio
                            error={!!errors?.answer?.message}
                            name="answer"
                            getOptionLabel={(option) => option.name}
                            options={agreementAnswers}
                            label="Работы будет выполнять:"
                            divider
                        />
                        {Number(answer) === AgreementAnswerIds.MY_SERVICE && (
                            <Stack mt={5} spacing={1}>
                                <GoToMaterials
                                    defectId={id}
                                    approvalId={responsiblePerson.id}
                                />
                                <StandartTextField
                                    name="sum"
                                    label="Стоимость"
                                    type="number"
                                    helperText={errors.sum?.message}
                                />
                            </Stack>
                        )}

                        <MyButton
                            isLoading={loading}
                            variant="contained"
                            type="submit"
                        >
                            Сохранить
                        </MyButton>
                    </Stack>
                </form>
            </FormProvider>
        </Stack>
    )
}
