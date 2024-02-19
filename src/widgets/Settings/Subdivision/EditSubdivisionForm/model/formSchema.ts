import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    userId: z.number(zodErrorMessage(VALIDATION_MESSAGES.required)),
})

export type EditSubdivisionFormFields = DataTypesFromZod<typeof formSchema>
