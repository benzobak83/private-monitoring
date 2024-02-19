import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    sum: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
    comment: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
})

export type AgreementFormFields = DataTypesFromZod<typeof formSchema>
