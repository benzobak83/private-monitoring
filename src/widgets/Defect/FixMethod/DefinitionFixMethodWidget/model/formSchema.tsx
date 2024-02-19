import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    comment: z
        .string(zodErrorMessage(VALIDATION_MESSAGES.required))
        .min(3, VALIDATION_MESSAGES.minLength(3)),
    fileIds: z.array(z.number()).optional(),
    isDispatcherService: z.boolean(),
})

export type DefinitionFixMethodFormFields = DataTypesFromZod<typeof formSchema>
