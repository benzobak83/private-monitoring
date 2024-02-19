import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Divider, Box, Button } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, Fragment } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { ResultOfCheckWithAuthor } from '@entities/Check'
import {
    InspectionAnswerPicker,
    TChecklistInspectionWithItems,
} from '@entities/Settings/ChecklistInspection'
import { TAnyFunc } from '@shared/types/Global'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { getCurrentResultByTypeAnswers } from '../../lib/getCurrentResultByPartialAnswers'
import { completeCheckFx } from '../../model/completeCheck'
import {
    CompleteInspectionFormFields,
    inspectionFormSchema,
} from '../../model/inspectionFormSchema'

const formId = 'completeInspectionForm'

type CompleteInspectionFormProps = {
    cbAfterComplete?: TAnyFunc
    checklistInspection: TChecklistInspectionWithItems
    checkId: number
}

export const CompleteInspectionForm: FC<CompleteInspectionFormProps> = ({
    checkId,
    cbAfterComplete,
    checklistInspection,
}) => {
    const completeCheckFxIsLoading = useStore(completeCheckFx.pending)

    const formMethods = useForm<CompleteInspectionFormFields>({
        resolver: zodResolver(inspectionFormSchema),
    })
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = formMethods

    const answers = useWatch({ name: 'answers', control })
    const currentResult = getCurrentResultByTypeAnswers(
        answers?.map((answer) => answer?.typeAnswers)
    )

    const onSubmit = (data: CompleteInspectionFormFields) => {
        const filteredData = {
            ...data,
            answers: data.answers.map((answer) => ({
                ...answer,
                typeAnswers: undefined,
            })),
            checklistId: checklistInspection.id,
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
                        {checklistInspection?.checklistItems?.map((item, i) => (
                            <Fragment key={item.id}>
                                <InspectionAnswerPicker
                                    name={`answers.${i}.answerOptionId`}
                                    checklistItemName={`answers.${i}.checklistItemId`}
                                    checklistItem={item}
                                    index={i}
                                    writeTypeAnswer
                                    helperText={
                                        errors.answers?.[i]?.answerOptionId
                                            ?.message
                                    }
                                />
                                {i !==
                                    checklistInspection?.checklistItems.length -
                                        1 && <Divider />}
                            </Fragment>
                        ))}
                    </Stack>
                </Box>
                <Divider />
                <Stack mt={2} spacing={2}>
                    {currentResult && (
                        <ResultOfCheckWithAuthor result={currentResult} />
                    )}

                    <StandartTextField
                        label="Комментарий"
                        name="comment"
                        multiline
                        minRows={4}
                        helperText={errors.comment?.message}
                    />
                </Stack>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        type="submit"
                        form={formId}
                        fullWidth
                    >
                        Завершить осмотр
                    </Button>
                </Box>
            </FormProvider>
        </LoaderWrapper>
    )
}
