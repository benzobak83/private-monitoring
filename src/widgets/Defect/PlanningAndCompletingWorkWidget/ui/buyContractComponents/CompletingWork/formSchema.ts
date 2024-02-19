import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    comment: z.string(zodErrorMessage(VALIDATION_MESSAGES.required)),
})

export type CompletingWorkFormFields = DataTypesFromZod<typeof formSchema>
