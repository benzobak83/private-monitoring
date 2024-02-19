import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    answer: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
    sum: z
        .number(zodErrorMessage(VALIDATION_MESSAGES.required))
        .min(1, VALIDATION_MESSAGES.minLength(1))
        .optional()
        .nullable(),
})

export type AgreementWithResponsibleFormFeilds = DataTypesFromZod<
    typeof formSchema
>
