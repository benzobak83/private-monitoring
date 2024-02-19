import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    checklistId: z
        .number(zodErrorMessage(VALIDATION_MESSAGES.required))
        .min(1, VALIDATION_MESSAGES.required),
})

export type EditObjectFormFields = DataTypesFromZod<typeof formSchema>
