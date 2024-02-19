import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { defineFixMethodFx } from '@/features/Defect/FixMethod/defineFixMethod'
import { goToPlanningWorkFx } from '@/features/Defect/FixMethod/goToPlanningWork'
import { FixMethodTypeIds } from '@entities/Defect'
import { $fixMethodLast } from '@entities/Defect/model/getFixMethod'
import {
    $officialsTableData,
    TOfficial,
    getResponsiblePersonsByKeys,
} from '@entities/Settings/Officials'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StandartCheckBox } from '@shared/ui/FormFields/StandartCheckBox/StandartCheckBox'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS } from '../../lib/formIds'
import { MOCK_SUBDIVISION_SERVICE_KEY } from '../../lib/subdivisionKey'
import { transformedCompleteStageData } from '../../lib/transformedCompleteStageData'
import {
    HeadOfDepartmentStepTwoFormFields,
    formSchema,
} from '../../model/formSchema'
import { HeadOfDepartmentStepTwoFormType } from '../../model/types'
import { HeadOfDepartmentStepTwoFormControllers } from './HeadOfDepartmentStepTwoFormControllers'

export const HeadOfDepartmentStepTwoForm: FC = () => {
    const officialsTableData = useStore($officialsTableData)
    const fixMethodLast = useStore($fixMethodLast)

    const { id } = useDefaultParams()

    const formMethod = useForm<HeadOfDepartmentStepTwoFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = formMethod

    const getOnSubmit = (type: HeadOfDepartmentStepTwoFormType) => {
        return (data: HeadOfDepartmentStepTwoFormFields) => {
            if (type === HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.completeStage) {
                const filteredData = transformedCompleteStageData(data)

                goToPlanningWorkFx({
                    id,
                    diagnosticId: fixMethodLast.id,
                    data: filteredData,
                })
            }
            if (
                type ===
                HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.transferToEngineerWithoutAgreement
            ) {
                const filteredData = {
                    method: FixMethodTypeIds.TRANSFER_TO_ENGINEER,
                }

                defineFixMethodFx({ data: filteredData, id })
            }
        }
    }

    const RESPONSIBLE_PERSON_KEYS = useMemo(() => {
        return fixMethodLast?.agreement?.map((item) => item.key)
    }, [fixMethodLast])

    const RESPONSIBLE_PERSONS = useMemo(() => {
        const responsiblePersons = getResponsiblePersonsByKeys(
            officialsTableData.rows,
            RESPONSIBLE_PERSON_KEYS
        )

        const responsiblePersonsWithSubdivisionService = [
            ...responsiblePersons,
            {
                key: MOCK_SUBDIVISION_SERVICE_KEY,
                name: 'Служба подразделения',
            },
        ]

        return responsiblePersonsWithSubdivisionService
    }, [officialsTableData.rows, RESPONSIBLE_PERSON_KEYS])
    return (
        <FormProvider {...formMethod}>
            <form
                id={HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.completeStage}
                onSubmit={handleSubmit(
                    getOnSubmit(
                        HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.completeStage
                    )
                )}
            ></form>
            <form
                id={
                    HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.transferToEngineerWithoutAgreement
                }
                onSubmit={handleSubmit(
                    getOnSubmit(
                        HEAD_OF_DEPARTMENT_STEP_TWO_FORM_IDS.transferToEngineerWithoutAgreement
                    )
                )}
            ></form>
            <Stack spacing={1}>
                <ViewFieldPrimitiveValue
                    label="Начальник подразделения"
                    value={'Иванов И.И.'}
                />

                <StandartCheckBox
                    error={!!errors?.subdivisionKeys?.message}
                    name="subdivisionKeys"
                    label="Работы будет выполнять:"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option: TOfficial) => option.key}
                    options={RESPONSIBLE_PERSONS}
                />

                <HeadOfDepartmentStepTwoFormControllers />
            </Stack>
        </FormProvider>
    )
}
