import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, SxProps, Theme } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defineFixMethodFx } from '@/features/Defect/FixMethod/defineFixMethod'
import { UploadFileBlock } from '@/features/File/uploadFile'
import { $defect, FixMethodTypeIds } from '@entities/Defect'
import { TypeManager } from '@entities/Dict'
import {
    $officialsTableData,
    TOfficial,
    getResponsiblePersonsByKeys,
} from '@entities/Settings/Officials'
import { CLEAR_ARRAY } from '@shared/lib/consts/mock'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { StandartCheckBox } from '@shared/ui/FormFields/StandartCheckBox/StandartCheckBox'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS } from '../../lib/formIds'
import {
    HeadOfDepartmentStepOneFormFields,
    formSchema,
} from '../../model/formSchema'
import { HeadOfDepartmentStepOneFormType } from '../../model/types'
import { CostByUnit } from './CostByUnit'
import { HeadOfDepartmentStepOneControllers } from './HeadOfDepartmentStepOneControllers'

type HeadOfDepartmentStepOneFormProps = {
    sx?: SxProps<Theme>
}
const initModals = {
    saveModal: false,
    saveAndAgreementModal: false,
    completeByTheUnityModal: false,
} as const

export type HeadOfDepartmentStepOneFormModal = typeof initModals

const RESPONSIBLE_PERSON_KEYS = [
    TypeManager.MECHANIC,
    TypeManager.POWER_ENGINEER,
    TypeManager.BOSS,
]

export const HeadOfDepartmentStepOneForm: FC<
    HeadOfDepartmentStepOneFormProps
> = ({ sx }) => {
    const officialsTableData = useStore($officialsTableData)
    const defect = useStore($defect)

    const { id } = useDefaultParams()

    const [saveAndAgreementIsLoading, setSaveAndAgreementIsLoading] =
        useState<boolean>(false)
    const [completeByUnitIsLoading, setCompleteByUnitIsLoading] =
        useState<boolean>(false)

    const modalMethods = useModal(initModals)
    const { closeModal } = modalMethods

    const formMethods = useForm<HeadOfDepartmentStepOneFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const getOnSubmit = (type: HeadOfDepartmentStepOneFormType) => {
        return (data: HeadOfDepartmentStepOneFormFields) => {
            delete data.weCan

            if (
                type === HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.saveAndAgreement
            ) {
                setSaveAndAgreementIsLoading(true)
                const filteredData = {
                    ...data,
                    method: FixMethodTypeIds.ON_YOUR_OWN_AND_AGREEMENT,
                }
                defineFixMethodFx({ id, data: filteredData }).finally(() => {
                    setSaveAndAgreementIsLoading(false)
                })
            }
            if (type === HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.completeByUnit) {
                setCompleteByUnitIsLoading(true)
                const filteredData = {
                    ...data,
                    subdivisionKeys: undefined,
                    method: FixMethodTypeIds.SUBDIVISION,
                }
                defineFixMethodFx({ id, data: filteredData }).finally(() => {
                    setCompleteByUnitIsLoading(false)
                })
            }
            closeModal()
        }
    }

    const RESPONSIBLE_PERSONS = useMemo(() => {
        return getResponsiblePersonsByKeys(
            officialsTableData.rows,
            RESPONSIBLE_PERSON_KEYS
        )
    }, [officialsTableData.rows])

    return (
        <ModalProvider {...modalMethods}>
            <LoaderWrapper loading={false}>
                <FormProvider {...formMethods}>
                    <Box sx={sx}>
                        <form
                            id={HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.save}
                            onSubmit={handleSubmit(
                                getOnSubmit(
                                    HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.save
                                )
                            )}
                        ></form>
                        <form
                            id={
                                HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.saveAndAgreement
                            }
                            onSubmit={handleSubmit(
                                getOnSubmit(
                                    HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.saveAndAgreement
                                )
                            )}
                        ></form>
                        <form
                            id={
                                HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.completeByUnit
                            }
                            onSubmit={handleSubmit(
                                getOnSubmit(
                                    HEAD_OF_DEPARTMENT_STEP_ONE_FORM_IDS.completeByUnit
                                )
                            )}
                        ></form>
                        <Stack spacing={2}>
                            <ViewFieldPrimitiveValue
                                value={defect?.subdivision?.user?.name}
                                label="Начальник подразделения"
                            />
                            <StandartTextField
                                multiline
                                minRows={4}
                                label="Описание неисправности"
                                name="comment"
                                helperText={errors?.comment?.message}
                            />
                            <UploadFileBlock
                                name="fileIds"
                                label="Приложения"
                                helperText={errors.fileIds?.message}
                                defaultValue={CLEAR_ARRAY}
                            />
                            <CostByUnit />

                            <StandartCheckBox
                                label="Согласовать с:"
                                name="subdivisionKeys"
                                getOptionLabel={(option: TOfficial) =>
                                    `${option?.name} - ${option?.users?.[0]?.name}`
                                }
                                getOptionValue={(option: TOfficial) =>
                                    option.key
                                }
                                options={RESPONSIBLE_PERSONS}
                            />

                            <HeadOfDepartmentStepOneControllers
                                saveAndAgreementIsLoading={
                                    saveAndAgreementIsLoading
                                }
                                completeByUnitIsLoading={
                                    completeByUnitIsLoading
                                }
                            />
                        </Stack>
                    </Box>
                </FormProvider>
            </LoaderWrapper>
        </ModalProvider>
    )
}
