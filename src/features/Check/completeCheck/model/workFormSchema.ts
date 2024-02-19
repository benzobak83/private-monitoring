import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const workFormSchema = z.object({
    answers: z.array(
        z.object(
            {
                checklistItemId: z.number(
                    zodErrorMessage(VALIDATION_MESSAGES.required)
                ),
                answerOptionId: z.number(
                    zodErrorMessage(VALIDATION_MESSAGES.required)
                ),
            },
            zodErrorMessage(VALIDATION_MESSAGES.required)
        )
    ),
})

export type CompleteWorkFormFields = DataTypesFromZod<typeof workFormSchema>
