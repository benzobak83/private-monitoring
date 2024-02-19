import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, SxProps, Theme } from '@mui/material'
import { useStore, useStoreMap } from 'effector-react'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defineFixMethodFx } from '@/features/Defect/FixMethod/defineFixMethod'
import { UploadFileBlock } from '@/features/File/uploadFile'
import { $defect, FixMethodTypeIds } from '@entities/Defect'
import { CLEAR_ARRAY } from '@shared/lib/consts/mock'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MySwitch } from '@shared/ui/FormFields/MySwitch/MySwitch'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { DEFINITION_FIX_METHOD_FORM_IDS } from '../../lib/formIds'
import {
    DefinitionFixMethodFormFields,
    formSchema,
} from '../../model/formSchema'
import { DefinitionFixMethodFormType } from '../../model/types'
import { DefinitionFixMethodFormControllers } from './DefinitionFixMethodFormControllers'

type DefinitionFixMethodFormProps = {
    sx?: SxProps<Theme>
}

export const DefinitionFixMethodForm: FC<DefinitionFixMethodFormProps> = ({
    sx,
}) => {
    const userWhoCompletedInspection = useStoreMap(
        $defect,
        (store) => store?.check?.user?.name
    )
    const defect = useStore($defect)

    const [
        canNotFixDefectByHimselfIsLoading,
        setСanNotFixDefectByHimselfIsLoading,
    ] = useState<boolean>(false)
    const [fixDefectByHimselfIsLoading, setFixDefectByHimselfIsLoading] =
        useState<boolean>(false)

    const { id } = useDefaultParams()

    const formMethods = useForm<DefinitionFixMethodFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const getOnSubmit = (type: DefinitionFixMethodFormType) => {
        return (data: DefinitionFixMethodFormFields) => {
            if (
                type === DEFINITION_FIX_METHOD_FORM_IDS.canNotFixDefectByHimself
            ) {
                setСanNotFixDefectByHimselfIsLoading(true)
                const filteredData = {
                    ...data,
                    method: FixMethodTypeIds.TRANSFER_TO_HEAD_OF_THE_DEPARTMENT,
                }
                defineFixMethodFx({ data: filteredData, id }).finally(() => {
                    setСanNotFixDefectByHimselfIsLoading(false)
                })
            }
            if (type === DEFINITION_FIX_METHOD_FORM_IDS.fixDefectByHimself) {
                setFixDefectByHimselfIsLoading(true)
                const filteredData = {
                    ...data,
                    method: FixMethodTypeIds.HIMSELF,
                }
                defineFixMethodFx({ data: filteredData, id }).finally(() => {
                    setFixDefectByHimselfIsLoading(false)
                })
            }
        }
    }

    return (
        <LoaderWrapper loading={false}>
            <FormProvider {...formMethods}>
                <Box sx={sx}>
                    <form
                        id={
                            DEFINITION_FIX_METHOD_FORM_IDS.canNotFixDefectByHimself
                        }
                        onSubmit={handleSubmit(
                            getOnSubmit(
                                DEFINITION_FIX_METHOD_FORM_IDS.canNotFixDefectByHimself
                            )
                        )}
                    ></form>
                    <form
                        id={DEFINITION_FIX_METHOD_FORM_IDS.fixDefectByHimself}
                        onSubmit={handleSubmit(
                            getOnSubmit(
                                DEFINITION_FIX_METHOD_FORM_IDS.fixDefectByHimself
                            )
                        )}
                    ></form>
                    <Stack spacing={1}>
                        <ViewFieldPrimitiveValue
                            value={userWhoCompletedInspection}
                            label="Сотрудник выполнивший осмотр"
                        />
                        <StandartTextField
                            multiline
                            minRows={4}
                            label="Описание неисправности"
                            name="comment"
                            defaultValue={defect.check?.comment}
                            helperText={errors.comment?.message}
                        />
                        <UploadFileBlock
                            name="fileIds"
                            label="Приложения"
                            helperText={errors.fileIds?.message}
                            defaultValue={CLEAR_ARRAY}
                        />
                        <MySwitch
                            name="isDispatcherService"
                            label="Нужна помощь ЦДС"
                        />
                    </Stack>
                    <DefinitionFixMethodFormControllers
                        canNotFixDefectByHimselfIsLoading={
                            canNotFixDefectByHimselfIsLoading
                        }
                        fixDefectByHimselfIsLoading={
                            fixDefectByHimselfIsLoading
                        }
                    />
                </Box>
            </FormProvider>
        </LoaderWrapper>
    )
}
