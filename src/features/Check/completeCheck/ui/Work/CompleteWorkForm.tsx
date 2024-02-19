import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Divider, Box, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, Fragment } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import {
    TChecklistWorkWithItems,
    WorkAnswerPicker,
} from '@entities/Settings/ChecklistWork'
import { TAnyFunc } from '@shared/types/Global'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { completeCheckFx } from '../..'
import {
    CompleteWorkFormFields,
    workFormSchema,
} from '../../model/workFormSchema'

const formId = 'completeWorkForm'

type CompleteWorkForm = {
    cbAfterComplete?: TAnyFunc
    checklistWork: TChecklistWorkWithItems
    checkId: number
}

export const CompleteWorkForm: FC<CompleteWorkForm> = ({
    cbAfterComplete,
    checklistWork,
    checkId,
}) => {
    const completeCheckFxIsLoading = useStore(completeCheckFx.pending)

    const formMethods = useForm<CompleteWorkFormFields>({
        resolver: zodResolver(workFormSchema),
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = formMethods
    console.log('errors - ', errors)

    const answers = useWatch({ name: 'answers', control })
    console.log('answers - ', answers)
    const onSubmit = (data: CompleteWorkFormFields) => {
        const filteredData = {
            ...data,
            checklistId: checklistWork.id,
        }

        completeCheckFx({ id: checkId, data: filteredData }).then(
            () => cbAfterComplete?.()
        )
    }

    return (
        <LoaderWrapper loading={completeCheckFxIsLoading}>
            <FormProvider {...formMethods}>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}></form>
                <Box mb={2}>
                    <Stack spacing={1}>
                        {checklistWork?.checklistItems?.map((item, i) => (
                            <Fragment key={item.id}>
                                <WorkAnswerPicker
                                    name={`answers.${i}.answerOptionId`}
                                    checklistItemName={`answers.${i}.checklistItemId`}
                                    checklistItem={item}
                                    index={i}
                                    helperText={
                                        errors.answers?.[i]?.answerOptionId
                                            ?.message
                                    }
                                />
                                {i !==
                                    checklistWork?.checklistItems?.length -
                                        1 && (
                                    <Divider
                                        sx={{ borderBottomWidth: '2px' }}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </Stack>
                </Box>
                <Divider />

                <Button
                    variant="contained"
                    type="submit"
                    form={formId}
                    fullWidth
                >
                    Завершить работу
                </Button>
            </FormProvider>
        </LoaderWrapper>
    )
}
