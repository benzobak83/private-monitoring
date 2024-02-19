import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const inspectionFormSchema = z.object({
    comment: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
    answers: z.array(
        z.object(
            {
                checklistItemId: z.number(
                    zodErrorMessage(VALIDATION_MESSAGES.required)
                ),
                answerOptionId: z.number(
                    zodErrorMessage(VALIDATION_MESSAGES.required)
                ),
                typeAnswers: z.number(
                    zodErrorMessage(VALIDATION_MESSAGES.required)
                ),
            },
            zodErrorMessage(VALIDATION_MESSAGES.required)
        )
    ),
})

export type CompleteInspectionFormFields = DataTypesFromZod<
    typeof inspectionFormSchema
>
