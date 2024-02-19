import { z } from 'zod'
import { VALIDATION_MESSAGES, zodErrorMessage } from '@shared/config/zod'
import { DataTypesFromZod } from '@shared/types/Form'

export const formSchema = z.object({
    act: z
        .string(zodErrorMessage(VALIDATION_MESSAGES.required))
        .optional()
        .nullable(),
    withoutAct: z.boolean(),
})

export type WriteOffMattertialsFormFields = DataTypesFromZod<typeof formSchema>
