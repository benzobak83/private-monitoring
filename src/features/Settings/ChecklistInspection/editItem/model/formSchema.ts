import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    name: z
        .string(zodErrorMessage(VALIDATION_MESSAGES.required))
        .min(1, VALIDATION_MESSAGES.required),
    answerOptions: z
        .array(
            z
                .object({
                    name: z.string().min(1, VALIDATION_MESSAGES.required),
                    typeAnswer: z.number(),
                })
                .or(z.null())
        )
        .or(z.undefined()),
})

export type EditChecklistItemFormFields = DataTypesFromZod<typeof formSchema>
